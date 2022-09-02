import { redirect, RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request }) => {
	const session = request.headers.get("cookie")?.match("session=([^;]+)");

	if (session && session[1]) {
		return new Response(null, {
			status: 302,
			headers: {
				'Location': "/",
				// remove the session from the "session" cookie (by setting Max-Age=0)
				'Set-Cookie': `session=${session[1]}; Max-Age=0; Path=/; Secure; HttpOnly; SameSite=Strict`,
			}
		});
	}

	throw redirect(302, "/");
};
