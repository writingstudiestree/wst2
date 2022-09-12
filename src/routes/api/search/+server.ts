import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { querySearchParams } from 'src/api/search';

export const GET: RequestHandler = async ({ url }) => {
	const result = await querySearchParams(url);

	return json(result);
}
