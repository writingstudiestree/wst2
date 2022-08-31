import mysql from 'mysql2/promise';
import { DATABASE_URL } from '../utils/constants';
import type { Attributions, AttributionsWithDefaults, Citations, CitationsWithDefaults, Content, ContentWithDefaults, Relations, RelationsWithDefaults, RevisionsWithDefaults } from './types';

const connection = await mysql.createConnection(DATABASE_URL);

export async function queryTest(): Promise<Content[]> {
	const [rows] = await connection.execute("SELECT * FROM content") as [Content[], any];

	return rows;
}

export async function getContent(id: number): Promise<Content|null> {
	const [results] = await connection.execute(
		"SELECT * FROM content WHERE content.id=? LIMIT 1",
		[id]
	) as [Content[], any];

	return results[0];
}

export async function insertContent(content: ContentWithDefaults): Promise<number> {
	const [result] = await connection.execute(
		"INSERT INTO content (`type`, `name`, `content`) VALUES (?, ?, ?)",
		[content.type, content.name, content.content]
	) as [mysql.ResultSetHeader, any];

	return result.insertId;
}

export async function updateContent(content: Content): Promise<void> {
	await connection.execute(
		"UPDATE content SET type=?, name=?, content=? WHERE id=?",
		[content.type, content.name, content.content, content.id]
	);
}

export async function getRelation(id: number): Promise<Relations|null> {
	const [results] = await connection.execute(
		"SELECT * FROM relations WHERE relations.id=? LIMIT 1",
		[id]
	) as [Relations[], any];

	return results[0];
}

export async function insertRelation(relation: RelationsWithDefaults): Promise<number> {
	const [result] = await connection.execute(
		"INSERT INTO relations (type, subtype, link_from, link_to, year_start, year_end, content) VALUES (?, ?, ?, ?, ?, ?, ?)",
		[relation.type, relation.subtype, relation.link_from, relation.link_to, relation.year_start, relation.year_end || null, relation.content]
	) as [mysql.ResultSetHeader, any];

	return result.insertId;
}

export async function updateRelation(relation: Relations): Promise<void> {
	await connection.execute(
		"UPDATE relations SET type=?, subtype=?, link_from=?, link_to=?, year_start=?, year_end=?, content=? WHERE id=?",
		[relation.type, relation.subtype, relation.link_from, relation.link_to, relation.year_start, relation.year_end || null, relation.content, relation.id]
	);
}

export async function getCitation(id: number): Promise<Citations|null> {
	const [results] = await connection.execute(
		"SELECT * FROM citations WHERE citations.id=? LIMIT 1",
		[id]
	) as [Citations[], any];

	return results[0];
}

export async function insertCitation(citation: CitationsWithDefaults): Promise<number> {
	const [result] = await connection.execute(
		"INSERT INTO citations (name, collection, content) VALUES (?, ?, ?)",
		[citation.name, citation.collection, citation.content]
	) as [mysql.ResultSetHeader, any];

	return result.insertId;
}

export async function updateCitation(citation: Citations): Promise<void> {
	await connection.execute(
		"UPDATE citations SET name=?, collection=?, content=? WHERE id=?",
		[citation.name, citation.collection, citation.content, citation.id]
	);
}

export async function getAttribution(id: number): Promise<Attributions|null> {
	const [results] = await connection.execute(
		"SELECT * FROM attributions WHERE attributions.id=? LIMIT 1",
		[id]
	) as [Attributions[], any];

	return results[0];
}

export async function insertAttribution(attribution: AttributionsWithDefaults): Promise<number> {
	const [result] = await connection.execute(
		"INSERT INTO attributions (type, link_material, link_citation) VALUES (?, ?, ?)",
		[attribution.type, attribution.link_material, attribution.link_citation]
	) as [mysql.ResultSetHeader, any];

	return result.insertId;
}

export async function updateAttribution(attribution: Attributions): Promise<void> {
	await connection.execute(
		"UPDATE attributions SET type=?, link_material=?, link_citation=? WHERE id=?",
		[attribution.type, attribution.link_material, attribution.link_citation, attribution.id]
	);
}

export async function insertRevision(revision: RevisionsWithDefaults): Promise<number> {
	const [result] = await connection.execute(
		"INSERT INTO revisions (type, link_modifies, content) VALUES (?, ?, ?)",
		[revision.type, revision.link_modifies, revision.content]
	) as [mysql.ResultSetHeader, any];

	return result.insertId;
}
