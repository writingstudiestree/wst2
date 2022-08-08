import { readFile } from 'fs/promises';
import getDatabase from '@databases/mysql-test';
import type mysql2 from 'mysql2/promise';

import { vi, afterAll } from 'vitest';
const mysql: typeof mysql2 = await vi.importActual("mysql2/promise");

async function createConnection(...args: any[]): ReturnType<typeof mysql2.createConnection> {
	// create a test database instance
	const { databaseURL } = await getDatabase();
	// connect to the provided database URL
	const conn = await mysql.createConnection(databaseURL);

	// initialize database tables with schema in "db/init.sql"
	const initSql = await readFile("./db/init.sql", "utf-8");
	for (let line of initSql.split(";")) {
		// remove comment syntax
		line = line.replace(/^--(.*)\n/, "");
		line = line.trim();
		if (!line) continue;

		await conn.execute(line).catch(() => null);

		const [_, table] = /^CREATE TABLE (\s+)/.exec(line) || [];
		if (table) await conn.execute(`TRUNCATE TABLE ${table}`);
	}

	return conn;
}

export default { createConnection };
