import { vi } from 'vitest';
import { InsertFormType } from './base';
import * as insert from './insert';

vi.mock("mysql2/promise");

describe('insert.ts', () => {
	test('inserts a minimum valid form submission', async () => {
		await insert.insertForm([
			{
				type: InsertFormType.CONTENT,
				value: {
					id: -1,
					type: "person",
					name: "A Person",
					content: {
						orcId: "",
						pronounceLink: "https://example.com",
						tags: [],
						websites: [],
						description: "",
					},
				}
			},
			{
				type: InsertFormType.CONTENT,
				value: {
					id: -2,
					type: "person",
					name: "Another Person",
					content: {
						orcId: "",
						pronounceLink: "https://example.com",
						tags: [],
						websites: [],
						description: "",
					},
				}
			},
			{
				type: InsertFormType.RELATION,
				value: {
					id: -3,
					type: "mentored",
					subtype: "",
					link_from: -1,
					link_to: -2,
					year_start: 2021,
					content: {},
				}
			}
		]);

		// expected: there are no returned errors
	});
});