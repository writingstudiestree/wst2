<script lang="ts">
	import Person from "../../../components/forms/Person.svelte";
	import School from "../../../components/forms/School.svelte";
	import Institution from "../../../components/forms/Institution.svelte";
	import Citation from "../../../components/forms/Citation.svelte";

	import { isRecordType, InsertFormType } from '../../../api/form/base';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { draftForms } from '../../../utils/forms/stores';

	//Form Modules
	import { goto } from "$app/navigation";

	function handleSubmit() {
		if (validateForms())
		{
			const form = get(draftForms);
			console.log(form);
			alert("submission successful");
		}
	}

	function validateForms() {
		return true;
	}

	const back = () => {
		goto(`/forms`);
	};

</script>
<button on:click = {back} class = "btn btn-secondary">Back to menu</button>
{#each Object.entries($draftForms[$page.params.uuid]) as [id, entry] (id)}
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

<style>
	.indent
	{
		margin-left: 10%;
	}
</style>