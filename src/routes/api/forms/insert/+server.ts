import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { validateForm, insertForm, InsertForm } from "src/api/forms";
import { checkSession } from 'src/utils/auth';

export const POST: RequestHandler = async ({ request }) => {
	// check that user is signed in with an active session
	const session = request.headers.get("cookie")?.match("session=([^;]+)");
	if (!session || !session[1] || !await checkSession(session[1]))
		throw error(500, "Not signed in");

	const form: InsertForm = await request.json();

	// if there are errors in form validation, return them
	const errors = await validateForm(form);
	if (errors.length) {
		return json({
			errors,
		}, {
			status: 400
		});
	}

	// otherwise, insert the form data
	const result = await insertForm(form);
	if (!result) {
		return json({
			errors: [],
		}, {
			status: 400
		});
	}

	return json({
		url: `/${result.type}/${result.value.id}`,
	});
}
