import type { RequestHandler } from "@sveltejs/kit";
import * as db from 'src/api/db';

export const GET: RequestHandler = async ({ url, params }) => {
	const [idStr, nameStr] = params.id.split("/");
	const id: number = parseInt(idStr);
	const content = await db.getContent(id).catch(console.error);

	let [name] = content?.name?.split(",") || [""];
	name = name.trim().replaceAll(" ", "_");

	if (name && !nameStr) {
		return {
			status: 302,
			headers: {
				Location: `/content/${id}/${encodeURIComponent(name)}`,
			},
		};
	}

	return {
		body: {
			content: content as never,
		},
	};
};