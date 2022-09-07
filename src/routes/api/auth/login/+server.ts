import { error, RequestHandler } from "@sveltejs/kit";
import * as bcrypt from "bcrypt";
import { USER_NAME, USER_PASS } from "src/utils/constants";
import { createSession, createSessionCookie } from "src/utils/auth";

const USER_NAME_HASH = await bcrypt.hash(USER_NAME, 10);
const USER_PASS_HASH = await bcrypt.hash(USER_PASS, 10);

export const POST: RequestHandler = async ({ request }) => {
	// TODO: replace with third-party auth
	const values = await request.formData();

	const email = values.get("email") as string;
	const password = values.get("password") as string;
	const redirectUrl = values.get("redirect") as string || "/";

	if (!email || !password) throw error(500, "Invalid request");

	const a = await bcrypt.compare(email, USER_NAME_HASH);
	const b = await bcrypt.compare(password, USER_PASS_HASH);
	if (!a || !b) throw error(500, "Invalid credentials");

	// create a session token
	const maxAge = 3600 * 12; // 12 hours
	const sessionId = await createSession(maxAge);

	return new Response(null, {
		status: 302,
		headers: {
			'Location': redirectUrl,
			// store the session id in a "session" cookie
			'Set-Cookie': createSessionCookie(sessionId, maxAge),
		}
	});
};
