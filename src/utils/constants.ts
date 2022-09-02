import 'dotenv/config'

export const DATABASE_URL = process.env.DATABASE_URL || "mysql://root:abcdefg123@localhost:3306/wst";

export const USER_NAME = process.env.USER_NAME || "test";
export const USER_PASS = process.env.USER_PASS || "test";
