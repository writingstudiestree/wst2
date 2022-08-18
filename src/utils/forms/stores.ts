import { writable, Writable, Readable, get } from 'svelte/store';
import debounce from 'lodash/debounce';

import type { InsertForm, InsertFormError } from 'src/api/forms/base';
import { validateForm } from 'src/api/forms/validate';

type DraftForm = {
	form: Writable<InsertForm>,
	errors: Readable<InsertFormError[]>,
};

type DraftForms = Record<string, DraftForm>;

type DraftFormStore = Readable<DraftForms> & {
	createForm(uuid: string, template: InsertForm): void,
	getForm(uuid: string): DraftForm,
}

// debounce validations with a 500ms delay (so the page doesn't update during typing/input)
const handleValidate = debounce(async ($form: InsertForm, set: (value: InsertFormError[]) => void) => {
	const errors = await validateForm($form);
	set(errors);
}, 500);

function createDraftFormStore() : DraftFormStore {
	const draftForms = writable<DraftForms>({});

	function createForm(uuid: string, template: InsertForm) {
		const form = writable(template);
		const errors: Writable<InsertFormError[]> = writable([]);

		form.subscribe(($form) => {
			handleValidate($form, ($errors) => errors.set($errors));
		});

		draftForms.set({
			...get(draftForms),
			[uuid]: { form, errors },
		});
	}

	function getForm(uuid: string) {
		let $draftForms = get(draftForms);
		if (!uuid || !(uuid in $draftForms)) {
			createForm(uuid, []);
		}

		return $draftForms[uuid];
	}

	return {
		subscribe: draftForms.subscribe,
		createForm,
		getForm,
	}
}

export const draftForm = createDraftFormStore();
