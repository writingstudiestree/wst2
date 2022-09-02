import { json as json$1 } from '@sveltejs/kit';
import { validateForm, insertForm, InsertForm } from "src/api/forms";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
	// TODO: authenticate the user

	const form: InsertForm = await request.json();

	// if there are errors in form validation, return them
	const errors = await validateForm(form);
	if (errors.length) {
		return json$1({
			errors,
		}, {
			status: 400
		});
	}

	// otherwise, insert the form data
	const result = await insertForm(form);
	if (!result) {
		return json$1({
			errors: [],
		}, {
			status: 400
		});
	}

	return json$1({
		url: `/${result.type}/${result.value.id}`,
	});
}
