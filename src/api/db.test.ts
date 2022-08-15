import { vi } from 'vitest';
import * as db from './db';

vi.mock("mysql2/promise");

describe('db.ts', () => {
	test('should run insertContent command', async () => {
		const id = await db.insertContent({
			type: "school",
			name: "University of Pittsburgh",
			content: {
				websites: ["https://pitt.edu"],
			},
		});

		const result = await db.getContent(id);
		expect(result?.name).toStrictEqual("University of Pittsburgh");
	});

	test('should run insertRelation command', async () => {
		const id = await db.insertRelation({
			type: "worked alongside",
			subtype: "co-administrator",
			link_from: 1,
			link_to: 2,
			year_start: 2022,
			year_end: null,
			content: {},
		});

		const result = await db.getRelation(id);
		expect(result?.subtype).toStrictEqual("co-administrator");
	});

	test('should run insertCitation command', async () => {
		const id = await db.insertCitation({
			name: "Some Citation",
			collection: "Internet Archive",
			content: { description: "An extended description." },
		});

		const result = await db.getCitation(id);
		expect(result?.name).toStrictEqual("Some Citation");
	});

	test('should run insertAttribution command', async () => {
		const id = await db.insertAttribution({
			type: "content",
			link_material: 2,
			link_citation: 0,
		});

		const result = await db.getAttribution(id);
		expect(result?.link_material).toStrictEqual(2);
	});
});
