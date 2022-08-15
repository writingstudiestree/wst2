<script lang="ts">
	import Person from "src/components/forms/Person.svelte";
	import School from "src/components/forms/School.svelte";
	import Institution from "src/components/forms/Institution.svelte";
	import Citation from "src/components/forms/Citation.svelte";

	import { isRecordType, InsertFormType } from 'src/api/forms/base';
	import { page } from '$app/stores';
	import { draftForm } from 'src/utils/forms';

	//Form Modules
	import { goto } from "$app/navigation";
	import { browser } from '$app/env';

	const back = () => {
		goto(`/forms`);
	};

	$: form = $draftForm[$page.params.uuid]?.form;
	$: errors = $draftForm[$page.params.uuid]?.errors;
	$: if (browser && !$form) {
		// If the draft is missing/empty, return to the forms page
		goto("/forms");
	}

	async function handleSubmit() {
		if ($errors.length == 0) {
			// submit form to the API route
			const res = await fetch("/api/forms/insert", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify($form),
			}).then(r => r.json()).catch(e => e);

			if (res.message || res.errors)
				alert("Could not submit the form. Please check your submission for errors.");

			if (res.url)
				goto(res.url);
		}
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

	<button class="btn btn-primary indent" on:click={handleSubmit}>Submit</button>
{/if}

<style>
	.indent
	{
		margin-left: 10%;
	}
</style>