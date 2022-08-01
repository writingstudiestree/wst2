import { writable } from 'svelte/store';

import type { InsertForm } from '../../api/form';

type DraftFormsStore = {
	[uuid: string]: InsertForm,
};

export const draftForms = writable<DraftFormsStore>({});
