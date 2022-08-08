import { writable } from 'svelte/store';

import type { InsertForm } from 'src/api/forms/base';

type DraftFormsStore = {
	[uuid: string]: InsertForm,
};

export const draftForms = writable<DraftFormsStore>({});
