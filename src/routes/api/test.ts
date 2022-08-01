import { queryTest } from "../../api/db";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
	const result = await queryTest();

	return {
		status: 200,
		body: {
			content: result
		}
	};
}
