import mysql from 'mysql2/promise';
import { DATABASE_URL } from '../utils/constants';
import type { Content } from './types';

const connection = await mysql.createConnection(DATABASE_URL);

connection.connect();

export async function queryTest(): Promise<Content[]> {
	const [rows, fields] = await connection.execute("SELECT * FROM content") as [Content[], any];

	return rows;
}

