<script lang="ts">
	import { InsertFormType } from 'src/api/forms/base';
	import type { Content } from 'src/api';
	import { draftForm } from '../../utils/forms/stores';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';

	$: form = $draftForm[$page.params.uuid]?.form;
	export let entry: Content & {
		content: any,
	};

	const addRelation = () =>
	{
		const newId = Math.min(...$form.map(record => record.value.id), -1) - 1;
		console.log($form);
		form.set([...get(form), { type: InsertFormType.RELATION, value:
			{
				id: newId,
				type: 'mentored',
				subtype: '',
				link_from: entry.id,
				link_to: 0,
				year_start: NaN,
				year_end: null,
				date_created: new Date(),
				date_modified: new Date(),
				content: {
					description: ""
				}
			}
		}
		]);
		console.log($form);
	};
</script>
<div class = "card card-body mb-3">
	<h2>Everything looking good?</h2>
	<p>Press the button below to start adding relations!</p>
	<button class="btn btn-primary indent" on:click={addRelation}>+ Add relation</button>
</div>