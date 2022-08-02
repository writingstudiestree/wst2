import { writable } from 'svelte/store';

import type { InsertForm } from '../../api/form/base';

type DraftFormsStore = {
	[uuid: string]: InsertForm,
};

export const draftForms = writable<DraftFormsStore>({});
