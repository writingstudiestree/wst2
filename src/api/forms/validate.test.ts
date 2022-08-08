import { InsertFormType } from './base';
import * as validate from './validate';

describe('validate.ts', () => {
	test('passes minimum valid form submission', () => {
		const errors = validate.validateForm({
			'-1': {
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
			'-2': {
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
			'-3': {
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
		});

		// expected: there are no returned errors
		expect(errors.length).toBe(0);
		expect(errors).toStrictEqual([]);
	});

	test('fails submission with a missing node', () => {
		const errors = validate.validateForm({
			'-1': {
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
			'-3': {
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
		});

		// expected: there is at least one error
		expect(errors.length).toBeGreaterThan(0);
		expect(errors).not.toStrictEqual([]);
		// expected: an error exists for the relation node ('2')
		expect(errors.some(e => e.key === '-3')).toBeTruthy();
	});
});