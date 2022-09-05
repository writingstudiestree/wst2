import type { PageServerLoad } from "./$types";
import { querySearchParams } from "src/api/search";

export const load: PageServerLoad = async ({ url }) => {
	const results = await querySearchParams(url);

	return {
		results,
	};
};
