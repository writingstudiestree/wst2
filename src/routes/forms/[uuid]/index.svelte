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

	//Relation components
	import RelationMaker from "../relationMaker.svelte";
	import RelationButtons from "src/components/relationIntakeComponents/RelationButtons.svelte";
	import Preview from "src/components/viewingComponents/preview.svelte";
	

	let saveAndContinue = false;

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
			{#if entry.value.type === "person"}
				{#if !saveAndContinue}
				<Person bind:value={entry.value} />
				{:else}
				<Preview bind:value={entry.value}/>
				{/if}
			{:else if entry.value.type === "school"}
			<School bind:value={entry.value} />
			{:else if entry.value.type === "institution"}
			<Institution bind:value={entry.value} />
			{/if}
			{#if !saveAndContinue}
			<RelationButtons bind:cont = {saveAndContinue} bind:entry={entry.value}/>
			{/if}
		{:else if isRecordType(entry, InsertFormType.RELATION)}
			<RelationMaker bind:value={entry.value}/>
		{/if}
	{/each}
{/if}

<style>
	.indent
	{
		margin-left: 10%;
	}
</style>