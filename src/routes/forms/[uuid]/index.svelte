<script lang="ts">
	import Person from "src/components/forms/Person.svelte";
	import School from "src/components/forms/School.svelte";
	import Institution from "src/components/forms/Institution.svelte";

	import { isRecordType, InsertFormType } from 'src/api/forms/base';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { draftForm } from 'src/utils/forms';

	//Form Modules
	import { goto } from "$app/navigation";
	import { browser } from '$app/env';

	//Relation components
	import RelationMaker from "src/components/relationIntakeComponents/RelationMaker.svelte";
	import RelationButtons from "src/components/relationIntakeComponents/RelationButtons.svelte";
	import Preview from "src/components/viewingComponents/preview.svelte";
	import Citation from "src/components/forms/Citation.svelte";
	

	let next = false;

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

	const nextStep = () =>
	{
		next = true;
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
			<button class="btn btn-primary" on:click={() => nextStep()}>Next</button>
			{/if}
		{:else if isRecordType(entry, InsertFormType.RELATION)}
			{#if next}
			<RelationMaker bind:value={entry.value}/>
			{/if}
		{:else if isRecordType(entry, InsertFormType.CITATION)}
		{#if next}
			<Citation bind:value={entry.value}/>
			{/if}
		{/if}
	{/each}
{/if}