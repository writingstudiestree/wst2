<script lang="ts">
	import Person from "../../../components/forms/Person.svelte";
	import School from "../../../components/forms/School.svelte";

	import { isRecordType, InsertFormType } from '../../../api/form/base';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { draftForms } from '../../../utils/forms/stores';

	//Form Modules
	import { goto } from "$app/navigation";

	function handleSubmit() {
		const form = get(draftForms);
		console.log(form);
	}
</script>

{#each Object.entries($draftForms[$page.params.uuid]) as [id, entry] (id)}
	{#if isRecordType(entry, InsertFormType.CONTENT) }
		{#if entry.value.type === "person"}
		<Person bind:value={entry.value} />
		{:else if entry.value.type === "school"}
		<School bind:value={entry.value} />
		{/if}
	{/if}
{/each}

<button class="btn btn-primary indent" on:click={handleSubmit}>Save and continue</button>

<style>
	.indent
	{
		margin-left: 10%;
	}
</style>