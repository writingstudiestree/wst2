import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import Institution from './Institution.svelte';

import { defaultForms } from '../../utils/forms/constants';

/**
* This is an example test that only checks if
* the document renders.
*/
describe('School', () => {
	test('should render with default props', () => {
		const form = Object.values(defaultForms["school"])[0];

		const { container } = render(Institution, {
			value: form.value,
		});

		expect(container).toBeInTheDocument();
	});
});