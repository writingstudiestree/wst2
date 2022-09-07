import type mysql2 from 'mysql2';

import { vi } from 'vitest';
const mysql: typeof mysql2 = await vi.importActual("mysql2");

// obtain the DATABASE_URL defined in `__setup__/db.ts`
const databaseURL = process.env.DATABASE_URL || "";

// connect to the provided database URL
const conn = mysql.createPool({
	uri: databaseURL,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

function createPool(...args: any[]): ReturnType<typeof mysql2.createPool> {
	return conn;
}

export default { createPool };
