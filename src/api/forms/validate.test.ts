import { vi } from 'vitest';
import * as db from '../db';
vi.mock("mysql2/promise");

global.window = undefined as any;
import { InsertForm, InsertFormType } from './base';
import * as validate from './validate';

const testValidForm: InsertForm = [
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
];

const testInvalidForm: InsertForm = [
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
];

describe('validate.ts', () => {
	test('finds an existing db CONTENT/person node', async () => {
		const id = await db.insertContent({
			type: "person",
			name: "Person Name",
			content: {},
		});

		const errors = await validate.validateEntryType(0, testValidForm, id, InsertFormType.CONTENT, ["person"]);

		// expected: there are no returned errors
		expect(errors.length).toBe(0);
		expect(errors).toStrictEqual([]);
	});

	test('finds a mismatched db CONTENT/institution node', async () => {
		const id = await db.insertContent({
			type: "person",
			name: "Person Name",
			content: {},
		});

		const errors = await validate.validateEntryType(0, testValidForm, id, InsertFormType.CONTENT, ["institution"]);

		// expected: there is at least one error
		expect(errors.length).toBeGreaterThan(0);
		expect(errors).not.toStrictEqual([]);
		// expected: an error exists for the provided key
		expect(errors.some(e => e.key === 0)).toBeTruthy();
	});

	test('finds a missing db CONTENT/person node', async () => {
		const errors = await validate.validateEntryType(0, testValidForm, 1000, InsertFormType.CONTENT, ["person"]);

		// expected: there is at least one error
		expect(errors.length).toBeGreaterThan(0);
		expect(errors).not.toStrictEqual([]);
		// expected: an error exists for the provided key
		expect(errors.some(e => e.key === 0)).toBeTruthy();
	});

	test('finds a local CONTENT/person node', async () => {
		const errors = await validate.validateEntryType(0, testValidForm, -1, InsertFormType.CONTENT, ["person"]);

		// expected: there are no returned errors
		expect(errors.length).toBe(0);
		expect(errors).toStrictEqual([]);
	});

	test('finds a missing local CONTENT/institution node', async () => {
		const errors = await validate.validateEntryType(0, testValidForm, -1, InsertFormType.CONTENT, ["institution"]);

		// expected: there is at least one error
		expect(errors.length).toBeGreaterThan(0);
		expect(errors).not.toStrictEqual([]);
		// expected: an error exists for the provided key
		expect(errors.some(e => e.key === 0)).toBeTruthy();
	});

	test('finds a missing local CITATION node', async () => {
		const errors = await validate.validateEntryType(0, testValidForm, -1, InsertFormType.CITATION);

		// expected: there is at least one error
		expect(errors.length).toBeGreaterThan(0);
		expect(errors).not.toStrictEqual([]);
		// expected: an error exists for the provided key
		expect(errors.some(e => e.key === 0)).toBeTruthy();
	});

	test('passes minimum valid form submission', async () => {
		const errors = await validate.validateForm(testValidForm);

		// expected: there are no returned errors
		expect(errors.length).toBe(0);
		expect(errors).toStrictEqual([]);
	});

	test('fails submission with a missing node', async () => {
		const errors = await validate.validateForm(testInvalidForm);

		// expected: there is at least one error
		expect(errors.length).toBeGreaterThan(0);
		expect(errors).not.toStrictEqual([]);
		// expected: an error exists for the relation node (id=-3)
		expect(errors.some(e => e.key === -3)).toBeTruthy();
	});
});