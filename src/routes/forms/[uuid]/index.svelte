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
	import RelationBasic from "src/components/relationIntakeComponents/RelationBasic.svelte";

	$: thisForm = draftForm.getForm($page.params.uuid)?.form;
	let saveAndContinue = false;
	function handleSubmit() {
		if (validateForms())
		{
			const form = get(draftForm);
			console.log($thisForm[0].value);
			saveAndContinue = true;
		}
	}

	function validateForms() {
		return true;
	}

	const back = () => {
		if (!saveAndContinue)
		{
			goto(`/forms`);
		}
		else
		{
			saveAndContinue = false;
		}
	};

	$: form = $draftForm[$page.params.uuid]?.form;
	$: if (browser && !$form) {
		// If the draft is missing/empty, return to the forms page
		goto("/forms");
	}
</script>
<button on:click = {back} class = "btn btn-secondary">Back to previous step</button>

{#if form}
	{#each $form as entry (entry.value.id)}
		{#if isRecordType(entry, InsertFormType.CONTENT)}
			{#if entry.value.type === "person" && !saveAndContinue}
			<Person bind:value={entry.value} />
			{#if saveAndContinue}
			<h1 class = "textCenter">Form relationships</h1>
			<div class = "inside">
				<h2>Getting Ready</h2>
				<p>Now that your node has been created, it is time to start forming relationships within the network! First, let's take a look at your current entry:</p>
				<div class = "inception">
					<h2>{entry.value.content?.valueOf()}</h2>
				</div>
				<p>See any errors? Use the 'back' button at the top of the page to correct them before we start integrating your node in to the network!</p>
			</div>
			{/if}
			<div>{entry.value.content}</div>
			{:else if entry.value.type === "school"}
			<School bind:value={entry.value} />
			{:else if entry.value.type === "institution"}
			<Institution bind:value={entry.value} />
			{/if}
		{/if}
		{#if isRecordType(entry, InsertFormType.RELATION) }
			<p>You just made a relation node</p>
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