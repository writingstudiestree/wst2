import { InsertFormType } from './base';
import * as validate from './validate';

describe('validate.ts', () => {
	test('passes minimum valid form submission', () => {
		const errors = validate.validateForm([
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
		expect(errors.length).toBe(0);
		expect(errors).toStrictEqual([]);
	});

	test('fails submission with a missing node', () => {
		const errors = validate.validateForm([
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

		// expected: there is at least one error
		expect(errors.length).toBeGreaterThan(0);
		expect(errors).not.toStrictEqual([]);
		// expected: an error exists for the relation node (index=1)
		expect(errors.some(e => e.key === 1)).toBeTruthy();
	});
});