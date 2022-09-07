import { vi } from 'vitest';
import * as db from './db';
import type { Citations, Content, Revisions } from './types';

vi.mock("mysql2/promise");

const testContent: Content = {
	id: -1,
	type: "school",
	name: "University of Pittsburgh",
	date_created: new Date(),
	date_modified: new Date(),
	content: {
		websites: ["https://pitt.edu"],
	},
};

const testCitation: Citations = {
	id: -1,
	name: "Some Citation",
	collection: "Internet Archive",
	date_created: new Date(),
	date_modified: new Date(),
	content: { description: "An extended description." },
};

const testRevision: Revisions = {
	id: -1,
	type: "content",
	link_modifies: -1,
	date_created: new Date(),
	content: {
		type: "school",
		name: "University of Pittsburgh",
		content: {
			websites: ["https://pitt.edu"],
		},
	},
};

describe('db.ts', () => {
	test('should run insertContent command', async () => {
		const id = await db.insertContent(testContent);

		const result = await db.getContent(id);
		expect(result?.name).toStrictEqual(testContent.name);
	});

	test('should run updateContent command', async () => {
		const id = await db.insertContent(testContent);

		await db.updateContent({
			id,
			type: "school",
			name: "CMU",
			date_created: new Date(),
			date_modified: new Date(),
			content: { websites: ["https://pitt.edu"] },
		});
		const result = await db.getContent(id);
		expect(result?.name).toStrictEqual("CMU");
	});

	test('should run insertRelation command', async () => {
		const link_from = await db.insertContent(testContent);
		const link_to = await db.insertContent(testContent);

		const id = await db.insertRelation({
			type: "worked alongside",
			subtype: "co-administrator",
			link_from,
			link_to,
			year_start: 2022,
			year_end: null,
			content: {},
		});

		const result = await db.getRelation(id);
		expect(result?.subtype).toStrictEqual("co-administrator");
	});

	test('should run insertCitation command', async () => {
		const id = await db.insertCitation(testCitation);

		const result = await db.getCitation(id);
		expect(result?.name).toStrictEqual(testCitation.name);
	});

	test('should run updateCitation command', async () => {
		const id = await db.insertCitation(testCitation);

		await db.updateCitation({
			id,
			name: "Other Citation",
			collection: "Internet Archive",
			date_created: new Date(),
			date_modified: new Date(),
			content: {},
		});
		const result = await db.getCitation(id);
		expect(result?.name).toStrictEqual("Other Citation");
	});

	test('should run insertAttribution command', async () => {
		const link_material = await db.insertContent(testContent);
		const link_citation = await db.insertCitation(testCitation);

		const id = await db.insertAttribution({
			type: "content",
			link_material,
			link_citation,
		});

		const result = await db.getAttribution(id);
		expect(result?.link_material).toStrictEqual(link_material);
	});

	test('should run insertRevision command', async () => {
		const id = await db.insertRevision(testRevision);

		expect(id).toBeGreaterThan(0);
	});
});
