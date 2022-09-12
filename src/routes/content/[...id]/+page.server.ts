import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import * as db from 'src/api/db';
import { querySearch } from "src/api/search";

export const load: PageServerLoad = async ({ params }) => {
	const [idStr, nameStr] = params.id.split("/");
	const id: number = parseInt(idStr);
	const content = await db.getContent(id);
	if (!content) throw new Error(`Content for id ${id} not found`);

	const relations = await querySearch({
		relation_with: id,
	});

	let [name] = content?.name?.split("|") || [""];
	name = name.trim().replaceAll(" ", "_");

	if (name && !nameStr) {
		throw redirect(302, `/content/${id}/${encodeURIComponent(name)}`);
	}

	return {
		content,
		relations,
	};
};