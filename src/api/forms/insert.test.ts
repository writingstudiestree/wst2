import { vi } from 'vitest';
import { db } from '..';
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

	test('updates an existing node with a form submission', async () => {
		// Insert a test content record
		const id = await db.insertContent({
			type: "person",
			name: "A Person",
			content: {
				orcId: "",
				pronounceLink: "https://example.com",
				tags: [],
				websites: [],
				description: "",
			},
		});

		// Use insertForm to update the existing node id
	  await insert.insertForm([
			{
				type: InsertFormType.CONTENT,
				value: {
					id,
					type: "person",
					name: "A Different Person",
					content: {
						orcId: "",
						pronounceLink: "https://example.com",
						tags: [],
						websites: [],
						description: "",
					},
				}
			}
		]);

		// expected: the name of the content node is now "A Different Person"
		const result = await db.getContent(id);
		expect(result?.name).toStrictEqual("A Different Person");
	});
});