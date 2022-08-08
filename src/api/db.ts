import mysql from 'mysql2/promise';
import { DATABASE_URL } from '../utils/constants';
import type { Attributions, Citations, Content, Relations } from './types';

const connection = await mysql.createConnection(DATABASE_URL);

export async function queryTest(): Promise<Content[]> {
	const [rows, fields] = await connection.execute("SELECT * FROM content") as [Content[], any];

	return rows;
}

export async function insertContent(content: Omit<Content, "id">): Promise<number> {
	const [result] = await connection.execute(
		"INSERT INTO content (type, name, content) VALUES (?, ?, ?);",
		[content.type, content.name, content.content],
	) as [mysql.ResultSetHeader, any];

	return result.insertId;
}

export async function insertRelation(relation: Omit<Relations, "id">): Promise<number> {
	const [result] = await connection.execute(
		"INSERT INTO relations (type, subtype, link_from, link_to, year_start, year_end, content) VALUES (?, ?, ?, ?, ?, ?, ?);",
		[relation.type, relation.subtype, relation.link_from, relation.link_to, relation.year_start, relation.year_end || null, relation.content],
	) as [mysql.ResultSetHeader, any];

	return result.insertId;
}


export async function insertCitation(citation: Omit<Citations, "id">): Promise<number> {
	const [result] = await connection.execute(
		"INSERT INTO citations (name, collection, content) VALUES (?, ?, ?);",
		[citation.name, citation.collection, citation.content],
	) as [mysql.ResultSetHeader, any];

	return result.insertId;
}

export async function insertAttribution(attribution: Omit<Attributions, "id">): Promise<number> {
	const [result] = await connection.execute(
		"INSERT INTO attributions (type, link_material, link_citation) VALUES (?, ?, ?);",
		[attribution.type, attribution.link_material, attribution.link_citation],
	) as [mysql.ResultSetHeader, any];

	return result.insertId;
}
