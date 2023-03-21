/**
* @jest-environment jsdom
*/

import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import Index from './+page.svelte';

/**
* This is an example test that only checks if
* the document renders.
*/
describe('Index', () => {
	test('should render the component', () => {
		const { container } = render(Index, { data: { user: null }});

		expect(container).toBeInTheDocument();
	});
});
