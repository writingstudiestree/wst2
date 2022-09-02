import { json } from '@sveltejs/kit';
import { queryTest } from "src/api/db";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
	const result = await queryTest();

	return json({
		content: result
	});
}
