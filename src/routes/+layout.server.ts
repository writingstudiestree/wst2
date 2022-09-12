import type { LayoutServerLoad } from "./$types";
import { checkSession } from "src/utils/auth";

export const load: LayoutServerLoad = async ({ request }) => {
	const session = request.headers.get("cookie")?.match("session=([^;]+)");

	let user = null;
	if (session && session[1] && await checkSession(session[1])) {
		user = {
			displayName: 'Testing Account',
			email: 'test@writingstudiestree.org',
		};
	}

	return {
		user,
	};
};
