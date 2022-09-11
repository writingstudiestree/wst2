import 'dotenv/config'

export const DATABASE_URL = import.meta.env.DATABASE_URL || "mysql://root:abcdefg123@localhost:3306/wst";

export const USER_NAME = import.meta.env.USER_NAME || "test@writingstudiestree.org";
export const USER_PASS = import.meta.env.USER_PASS || "test";
