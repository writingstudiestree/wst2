import { readFile } from 'fs/promises';
import getDatabase from '@databases/mysql-test';
import mysql2 from 'mysql2/promise';

export async function setup() {
	// create a test database instance
	const { databaseURL, kill } = await getDatabase();
	// connect to the provided database URL
	const conn = await mysql2.createConnection(databaseURL);

	// initialize database tables with schema in "db/init.sql"
	const initSql = await readFile("./db/init.sql", "utf-8");

	const tables: string[] = [];
	for (let line of initSql.split(";")) {
		// remove comment syntax
		line = line.replace(/^--(.*)\n/, "");
		line = line.trim();
		if (!line) continue;

		await conn.execute(line).catch(() => null);

		const [_, table] = /^CREATE TABLE (\s+)/.exec(line) || [];
		if (table) tables.push(table);
	}

	// clear contents of each table before tests
	for (const table of tables)
		await conn.execute(`TRUNCATE TABLE ${table}`);

	// set env.DATABASE_URL with created database
	process.env.DATABASE_URL = databaseURL;

	return async () => {
		await kill();
	}
}
