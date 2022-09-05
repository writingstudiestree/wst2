import { vi } from 'vitest';
import * as db from '../db';
import { querySearch} from './db';
import type { Content } from '../types';

vi.mock("mysql2");

const testSchool: Content = {
	id: -1,
	type: "school",
	name: "University of Pittsburgh",
	date_created: new Date(),
	date_modified: new Date(),
	content: {
		websites: ["https://pitt.edu"],
		tags: ["Computer Science"],
	},
};

const testPerson: Content = {
	id: -1,
	type: "person",
	name: "A Person",
	date_created: new Date(),
	date_modified: new Date(),
	content: {
		tags: ["Computer Science"],
	},
};

describe('db.ts', () => {
	test('should return a partial name search', async () => {
		const id = await db.insertContent(testSchool);

		const result = await querySearch({
			content_name: "Pitt",
		});

		expect(
			result.some(({ content }) => content.id === id)
		).toBeTruthy();
	});

// SELECT content.id AS content_id,content.type AS content_type,content.name AS content_name,content.date_created AS content_date_created,content.date_modified AS content_date_modified,content.content AS content_content,relations.id AS relations_id,relations.type AS relations_type,relations.subtype AS relations_subtype,relations.link_from AS relations_link_from,relations.link_to AS relations_link_to,relations.year_start AS relations_year_start,relations.year_end AS relations_year_end,relations.date_created AS relations_date_created,relations.date_modified AS relations_date_modified,relations.content AS relations_content FROM content WHERE MATCH (content.name) AGAINST (? IN BOOLEAN MODE) INNER JOIN relations ON (relations.link_from = ? AND relations.link_to = content.id) OR (relations.link_from = content.id AND relations.link_to = ?) ORDER BY content.id DESC LIMIT 100

	test('should filter by relation', async () => {
		const idSchool = await db.insertContent(testSchool);
		const idPerson = await db.insertContent(testPerson);

		await db.insertRelation({
			type: "studied at",
			subtype: "Undergraduate",
			link_from: idPerson,
			link_to: idSchool,
			year_start: 2018,
			year_end: 2022,
			content: {},
		});

		const result = await querySearch({
			content_name: testPerson.name,
			relation_with: idSchool,
		});

		expect(
			result.some(({ content, relation }) => content.id === idPerson && relation?.link_to === idSchool)
		).toBeTruthy();
	});
});
