import { redirect, RequestHandler } from "@sveltejs/kit";
import { removeSession, createSessionCookie } from "src/utils/auth";

export const GET: RequestHandler = async ({ request }) => {
	const session = request.headers.get("cookie")?.match("session=([^;]+)");

	if (session && session[1]) {
		// attempt to remove the user session from storage
		await removeSession(session[1]);

		return new Response(null, {
			status: 302,
			headers: {
				'Location': "/",
				// remove the session from the "session" cookie (by setting Max-Age=0)
				'Set-Cookie': createSessionCookie(session[1], 0),
			}
		});
	}

	throw redirect(302, "/");
};
