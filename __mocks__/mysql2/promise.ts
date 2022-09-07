import type mysql2 from 'mysql2/promise';

import { vi } from 'vitest';
const mysql: typeof mysql2 = await vi.importActual("mysql2/promise");

// obtain the DATABASE_URL defined in `__setup__/db.ts`
const databaseURL = process.env.DATABASE_URL || "";

// connect to the provided database URL
const conn = await mysql.createConnection(databaseURL);

async function createConnection(...args: any[]): ReturnType<typeof mysql2.createConnection> {
	return conn;
}

export default { createConnection };
