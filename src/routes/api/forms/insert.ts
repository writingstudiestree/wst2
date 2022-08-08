import { validateForm } from "../../../api/form/validate";
import { insertForm } from "../../../api/form/insert";

import type { RequestHandler } from "@sveltejs/kit";
import type { InsertForm } from "../../../api/form/base";

export const POST: RequestHandler = async ({ request }) => {
	// TODO: authenticate the user

	const form: InsertForm = await request.json();

	// if there are errors in form validation, return them
	const errors = validateForm(form);
	if (errors.length) {
		return {
			status: 400,
			body: errors,
		};
	}

	// otherwise, insert the form data
	await insertForm(form);
	return { status: 200 };
}
