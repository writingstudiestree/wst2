import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { checkSession } from 'src/utils/auth';
import * as db from 'src/api/db';

const tableColumns = {
	content: {
		gephi: {
			id: "Id",
			name: "Label",
			type: "Type",
		},
		kumu: {
			id: "ID",
			name: "Label",
			type: "Type",
		}
	},
	relations: {
		gephi: {
			id: "Id",
			link_from: "Source",
			link_to: "Target",
			direction: "Type",
		},
		kumu: {
			id: "ID",
			link_from: "From",
			link_to: "To",
		}
	},
};

const relationsTypesUndirected = ["worked alongside"];

function formatCSV(rows: any[]) {
	const headers = new Set<string>();

	// sum all headers in `headers` set
	for (const row of rows) {
		for (const key of Object.keys(row))
			headers.add(key);
	}

	const csvHeaders = [...headers].sort((a, b) => {
		// sort headers to place ID (and other columns) first
		const order = (s: string) => {
			return +(s.toLowerCase() === "id")*5
				+ +(s.toLowerCase() === "from")*4
				+ +(s.toLowerCase() === "to")*3
				+ +(s.toLowerCase() === "label")*2
				+ +(s.toLowerCase() === "type")*1;
		};

		return order(b) - order(a);
	});

	const csvRows = rows.map((row) => {
		// map header values to keys (if not in this row, leave empty)
		return csvHeaders.map(key => {
			const value = key in row ? row[key] + "" : "";

			// if the value is a string, quote/escape any commas/quotes/tabs/etc
			if (value.replace(/ /g, '').match(/[\s,"]/))
				return `"${value.replace(/"/g, '""')}"`;

			return value;
		}).join(",");
	});

	return csvHeaders.join(",") + '\n' + csvRows.join('\n') + '\n';
}

export const GET: RequestHandler = async ({ request, url }) => {
	// check that user is signed in with an active session
	const session = request.headers.get("cookie")?.match("session=([^;]+)");
	if (!session || !session[1] || !await checkSession(session[1]))
		throw error(500, "Not signed in");

	const tableParam = url.searchParams.get("table") || "";
	const table = tableParam === "relations" ? "relations" : "content";

	const formatParam = url.searchParams.get("format") || "";
	const format = formatParam === "kumu" ? "kumu" : "gephi";

	let rows: any[] = [];
	let filename = "nodes.csv";

	if (table === "content") {
		const contents = await db.getAllContent();

		rows = contents.map(({ content, ...rest }) => {
			// flatten nested "content" JSON into object
			if (typeof content === "object")
				return { ...content, ...rest };
			else
				return { ...rest };
		})
	}

	if (table === "relations") {
		filename = "edges.csv";
		const relations = await db.getAllRelations();

		rows = relations.map(({ content, ...rest }) => {
			// flatten nested "content" JSON into object
			if (typeof content === "object")
				return { ...content, ...rest };
			else
				return { ...rest };
		}).map((row) => {
			// add "direction" column to indicate directed/undirected types
			return {
				direction: relationsTypesUndirected.includes(row.type) ? "Undirected" : "Directed",
				...row,
			}
		});
	}

	// map column names for specific format
	const columns = tableColumns[table][format] as Record<string, string>;
	rows = rows.map((row) => {
		const entries = Object.entries(row)
			.map(([key, value]) => (key in columns ? [columns[key], value] : [key, value]));

		return Object.fromEntries(entries);
	});

	return new Response(formatCSV(rows), {
		status: 200,
		headers: {
			'Content-Type': "text/csv",
			'Content-Disposition': `attachment; filename="${filename}"`,
		},
	});
}
