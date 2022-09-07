import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import School from './School.svelte';

import type { InsertFormRecord, InsertFormType } from 'src/api/forms';
import { defaultForms } from 'src/utils/forms';

/**
* This is an example test that only checks if
* the document renders.
*/
describe('School', () => {
	test('should render with default props', () => {
		const form = Object.values(defaultForms.school)[0] as InsertFormRecord<InsertFormType.CONTENT>;

		const { container } = render(School, {
			value: form.value,
		});

		expect(container).toBeInTheDocument();
	});
});