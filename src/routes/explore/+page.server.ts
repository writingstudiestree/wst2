import type { PageServerLoad } from "./$types";
import { getSearchQuery, querySearch } from "src/api/search";

export const load: PageServerLoad = async ({ url }) => {
	const query = getSearchQuery(url);
	const results = await querySearch(query);

	return {
		query,
		results,
	};
};
