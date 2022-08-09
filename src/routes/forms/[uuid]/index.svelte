<script lang="ts">
	import Person from "src/components/forms/Person.svelte";
	import School from "src/components/forms/School.svelte";
	import Institution from "src/components/forms/Institution.svelte";
	import Citation from "src/components/forms/Citation.svelte";

	import { isRecordType, InsertFormType } from 'src/api/forms/base';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { draftForm } from 'src/utils/forms';

	//Form Modules
	import { goto } from "$app/navigation";
	import { browser } from '$app/env';

	function handleSubmit() {
		if (validateForms())
		{
			const form = get(draftForm);
			console.log(form);
			goto(`./relationMaker`);
		}
	}

	function validateForms() {
		return true;
	}

	const back = () => {
		goto(`/forms`);
	};

	$: form = $draftForm[$page.params.uuid]?.form;
	$: if (browser && !$form) {
		// If the draft is missing/empty, return to the forms page
		goto("/forms");
	}
</script>
<button on:click = {back} class = "btn btn-secondary">Back to menu</button>

{#if form}
	{#each $form as entry (entry.value.id)}
		{#if isRecordType(entry, InsertFormType.CONTENT) }
			{#if entry.value.type === "person"}
			<Person bind:value={entry.value} />
			{:else if entry.value.type === "school"}
			<School bind:value={entry.value} />
			{:else if entry.value.type === "institution"}
			<Institution bind:value={entry.value} />
			{/if}
		{:else if isRecordType(entry, InsertFormType.CITATION) }
			<Citation bind:value={entry.value}/>
		{/if}
	{/each}

	<button class="btn btn-primary indent" on:click={handleSubmit}>Save and continue</button>
{/if}

<style>
	.indent
	{
		margin-left: 10%;
	}
</style>