import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import Person from './Person.svelte';

import type { InsertFormRecord, InsertFormType } from 'src/api/forms';
import { defaultForms } from 'src/utils/forms';

/**
* This is an example test that only checks if
* the document renders.
*/
describe('Person', () => {
	test('should render with default props', () => {
		const form = Object.values(defaultForms.person)[0] as InsertFormRecord<InsertFormType.CONTENT>;

		const { container } = render(Person, {
			value: form.value,
		});

		expect(container).toBeInTheDocument();
	});
});