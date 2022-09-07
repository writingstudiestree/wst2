import type { PageServerLoad } from "./$types";
import * as db from 'src/api/db';

export const load: PageServerLoad = async ({ params }) => {
	const id: number = parseInt(params.id);
	const relation = await db.getRelation(id);
	if (!relation) throw new Error(`Relation for id ${id} not found`);

	const content_from = await db.getContent(relation.link_from);
	const content_to = await db.getContent(relation.link_to);
	if (!content_from || !content_to) throw new Error(`Content for relation ${id} not found`);

	return {
		relation,
		content_from,
		content_to,
	};
};
