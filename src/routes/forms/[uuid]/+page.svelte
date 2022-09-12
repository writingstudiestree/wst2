<script lang="ts">
	import Person from "src/components/forms/Person.svelte";
	import School from "src/components/forms/School.svelte";
	import Institution from "src/components/forms/Institution.svelte";

	import { isRecordType, InsertFormType } from 'src/api/forms/base';
	import { page } from '$app/stores';
	import { draftForm } from 'src/utils/forms';

	//Form Modules
	import { goto } from "$app/navigation";
	import { browser } from '$app/environment';

	//Relation components
	import RelationMaker from "src/components/relationIntakeComponents/RelationMaker.svelte";
	import RelationButtons from "src/components/relationIntakeComponents/RelationButtons.svelte";
	import Preview from "src/components/viewingComponents/NodePreview.svelte";

	$: form = $draftForm[$page.params.uuid]?.form;
	$: errors = $draftForm[$page.params.uuid]?.errors;
	$: if (browser && !$form.length) {
		// If the draft is missing/empty, return to the forms page
		goto("/forms");
	}

	let next = false;

	function handleBack() {
		if (!next) goto(`/forms`);
		else next = false;
	};

	// invokes callback() only if no errors are found - otherwise, displays the erroneous field
	function checkValidation() : boolean {
		// update the form state to display any errors
		$draftForm[$page.params.uuid]?.state.update(s => (s.displayErrors = true, s));

		if ($errors)
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

		return $errors.length == 0;
	}

	async function handleNext() {
		if (checkValidation())
			next = true;
	};

	async function handleSubmit() {
		if (!checkValidation())
			return;

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
</script>

{#if form}
<div class="form-content">
	<button on:click={handleBack} class="btn btn-secondary d-flex align-items-center">
		<i class="material-icons me-2">arrow_back</i>
		Back to previous step
	</button>

	{#each $form as entry (entry.value.id)}
		{#if isRecordType(entry, InsertFormType.CONTENT)}
			{#if !next}
				{#if entry.value.type === "person"}
					<Person bind:value={entry.value} />
				{:else if entry.value.type === "school"}
					<School bind:value={entry.value} />
				{:else if entry.value.type === "institution"}
					<Institution bind:value={entry.value} />
				{/if}
			{:else}
				<Preview bind:value={entry.value}/>
				<RelationButtons bind:entry={entry.value}/>
			{/if}
		{/if}
	{/each}

	{#each $form as entry (entry.value.id)}
		{#if isRecordType(entry, InsertFormType.RELATION)}
			{#if next}
			<RelationMaker bind:value={entry.value}/>
			{/if}
		{/if}
	{/each}

	<div class="d-grid gap-2" style="grid-auto-columns: minmax(0, 1fr); grid-auto-flow: column;">
		<button class="btn btn-secondary" on:click={handleBack}>Back to previous step</button>
		{#if !next}
		<button class="btn btn-primary" on:click={handleNext}>Next</button>
		{:else}
		<button class="btn btn-primary" on:click={handleSubmit}>Save</button>
		{/if}
	</div>
</div>
{/if}

<style>
	.form-content {
		max-width: 960px;
		margin: 0 auto;
	}
</style>
