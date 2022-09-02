import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import Institution from './Institution.svelte';

import type { InsertFormRecord, InsertFormType } from 'src/api/forms';
import { defaultForms } from 'src/utils/forms';

/**
* This is an example test that only checks if
* the document renders.
*/
describe('Institution', () => {
	test('should render with default props', () => {
		const form = Object.values(defaultForms.institution)[0] as InsertFormRecord<InsertFormType.CONTENT>;

		const { container } = render(Institution, {
			value: form.value,
		});

		expect(container).toBeInTheDocument();
	});
});