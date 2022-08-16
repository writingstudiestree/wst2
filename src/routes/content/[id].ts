import type { RequestHandler } from "@sveltejs/kit";
import * as db from 'src/api/db';

export const GET: RequestHandler = async ({ url, params }) => {
	const id: number = parseInt(params.id);
	const content = await db.getContent(id).catch(console.error);

	return {
		body: {
			content: content as never,
		},
	};
};