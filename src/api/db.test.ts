import { vi } from 'vitest';
import * as db from './db';

vi.mock("mysql2/promise");

describe('db.ts', () => {
	test('should run insertContent command', async () => {
		await db.insertContent({
			type: "school",
			name: "University of Pittsburgh",
			content: {
				websites: ["https://pitt.edu"],
			},
		});

		// TODO: assert whether test has passed
	});

	test('should run insertRelation command', async () => {
		await db.insertRelation({
			type: "worked alongside",
			subtype: "co-administrator",
			link_from: 1,
			link_to: 2,
			year_start: 2022,
			year_end: null,
			content: {},
		});

		// TODO: assert whether test has passed
	});

	test('should run insertCitation command', async () => {
		await db.insertCitation({
			name: "Some Citation",
			collection: "Internet Archive",
			content: { description: "An extended description." },
		})
	});

	test('should run insertAttribution command', async () => {
		await db.insertAttribution({
			type: "content",
			link_material: 2,
			link_citation: 0,
		});
	});
});
