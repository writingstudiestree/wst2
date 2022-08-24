<script lang="ts">
	import Person from "src/components/forms/Person.svelte";
	import School from "src/components/forms/School.svelte";
	import Institution from "src/components/forms/Institution.svelte";

	import { isRecordType, InsertFormType } from 'src/api/forms/base';
	import { page } from '$app/stores';
	import { draftForm } from 'src/utils/forms';

	//Form Modules
	import { goto } from "$app/navigation";
	import { browser } from '$app/env';

	//Relation components
	import RelationMaker from "src/components/relationIntakeComponents/RelationMaker.svelte";
	import RelationButtons from "src/components/relationIntakeComponents/RelationButtons.svelte";
	import Preview from "src/components/viewingComponents/NodePreview.svelte";
	import ContentValidationButton from "src/components/relationIntakeComponents/ContentValidationButton.svelte";
	
	export let next = false;

	const back = () => {
		if (!next)
		{
			goto(`/forms`);
		}
		else
		{
			next = false;
		}
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
		} else {
			console.log("Errors found in handleSubmit", $errors);

			for (const err of $errors) {
				// look for a field with the id referenced in the error obj
				const field = err.field && document.getElementById(err.field);
				if (field) {
					// if a field is found with the erroring id, focus on it & scroll the page
					field.focus();
					field.scrollIntoView({
						behavior: "smooth",
						block: "center"
					});
					break;
				}
			}
		}
	}
</script>
<button on:click = {back} class = "btn btn-secondary">Back to previous step</button>

{#if form}
	{#each $form as entry (entry.value.id)}
		{#if isRecordType(entry, InsertFormType.CONTENT)}
			{#if entry.value.type === "person"}
				{#if !next}
				<Person bind:value={entry.value} />
				{:else}
				<Preview bind:value={entry.value}/>
				<RelationButtons bind:entry={entry.value}/>
				{/if}
			{:else if entry.value.type === "school"}
				{#if !next}
				<School bind:value={entry.value} />
				{:else}
				<Preview bind:value={entry.value}/>
				<RelationButtons bind:entry={entry.value}/>
				{/if}
			{:else if entry.value.type === "institution"}
				{#if !next}
				<Institution bind:value={entry.value} />
				{:else}
				<Preview bind:value={entry.value}/>
				<RelationButtons bind:entry={entry.value}/>
				{/if}
			{/if}
			{#if !next}
			<ContentValidationButton bind:nextFlag={next}/>
			{/if}
		{/if}
	{/each}

<button class="btn btn-primary indent" on:click={handleSubmit}>Continue</button>

{/if}

{#if form}
	{#each $form as entry (entry.value.id)}
		{#if isRecordType(entry, InsertFormType.RELATION)}
			{#if next}
			<RelationMaker bind:value={entry.value}/>
			{/if}
		{/if}
	{/each}
{/if}