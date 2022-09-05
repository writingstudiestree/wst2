import { connection } from "../db";
import type { SearchQuery, SearchResult } from "./base";

const MAX_RESULTS = 100;

// Transforms a url's query params into a search query object
export async function querySearchParams(url: URL) : Promise<SearchResult[]> {
	const query: SearchQuery = {
		content_type: url.searchParams.get("content_type"),
		content_name: url.searchParams.get("content_name"),
		content_tag: url.searchParams.get("content_tag"),
		relation_with: url.searchParams.has("relation_with") ? +(url.searchParams.has("relation_with")) : null,
		relation_type: url.searchParams.get("relation_type"),
		last_id: url.searchParams.has("last_id") ? +(url.searchParams.has("last_id")) : null,
	};

	return await querySearch(query);
}


// Performs a database search of the SearchQuery object
export async function querySearch(query: SearchQuery) : Promise<SearchResult[]> {
	const sqlSelect = [
		"content.id AS content_id",
		"content.type AS content_type",
		"content.name AS content_name",
		"content.date_created AS content_date_created",
		"content.date_modified AS content_date_modified",
		"content.content AS content_content",
	];

	const sqlWhere = []
	const sqlArgs = [];
	const sqlParams = [];

	if (query.last_id) {
		sqlWhere.push("content.id < ?");
		sqlArgs.push(query.last_id);
	}

	if (query.content_type) {
		sqlWhere.push("content.type=?");
		sqlArgs.push(query.content_type);
	}

	if (query.content_name) {
		// perform fulltext/similarity match against a content_name search
		sqlWhere.push("MATCH (content.name) AGAINST (? IN BOOLEAN MODE)");
		sqlArgs.push(query.content_name.endsWith("*")
			? query.content_name
			: query.content_name + "*");
	}

	if (query.content_tag) {
		// perform JSON_CONTAINS to see if a particular tag exists
		sqlWhere.push("JSON_CONTAINS(content, ?, '$.tags')");
		sqlArgs.push(query.content_tag);
	}

	if (query.relation_with) {
		// join sql on relations in either direction (queryId -> contentId) || (contentId -> queryId)
		sqlParams.push(
			// if using JOIN, where conditions should be in the ON command
			`INNER JOIN relations ON ${sqlWhere.map(c => c + " AND").join(" ")} ((relations.link_from = ? AND relations.link_to = content.id) OR (relations.link_from = content.id AND relations.link_to = ?))`
		);
		sqlArgs.push(query.relation_with, query.relation_with);

		sqlSelect.push(
			"relations.id AS relations_id",
			"relations.type AS relations_type",
			"relations.subtype AS relations_subtype",
			"relations.link_from AS relations_link_from",
			"relations.link_to AS relations_link_to",
			"relations.year_start AS relations_year_start",
			"relations.year_end AS relations_year_end",
			"relations.date_created AS relations_date_created",
			"relations.date_modified AS relations_date_modified",
			"relations.content AS relations_content",
		);

		if (query.relation_type) {
			sqlParams.push("AND relations.type = ?");
			sqlArgs.push(query.relation_type);
		};
	} else if (sqlWhere.length) {
		// otherwise, use WHERE
		sqlParams.push(`WHERE ${sqlWhere.join(",")}`)
	}

	// order by "most recently added" (i.e. a descending id column)
	sqlParams.push("ORDER BY content.id DESC");
	// limit queries to MAX_RESULTS
	sqlParams.push(`LIMIT ${MAX_RESULTS}`);

	let sql = `SELECT ${sqlSelect.join(",")} FROM content ${sqlParams.join(" ")}`;
	const results = await connection.execute(sql, sqlArgs) as [any[], any];


	return results[0].map(result => {
		return {
			content: {
				id: result.content_id,
				type: result.content_type,
				name: result.content_name,
				date_created: result.content_date_created,
				date_modified: result.content_date_modified,
				content: result.content_content,
			},
			relation: !result.relations_id ? undefined : {
				id: result.relations_id,
				type: result.relations_type,
				subtype: result.relations_subtype,
				link_from: result.relations_link_from,
				link_to: result.relations_link_to,
				year_start: result.relations_year_start,
				year_end: result.relations_year_end,
				date_created: result.relations_date_created,
				date_modified: result.relations_date_modified,
				content: result.relations_content,
			},
		} as SearchResult;
	});
}
