<script lang="ts">
	import Person from "../../../components/forms/Person.svelte";
	import School from "../../../components/forms/School.svelte";

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
{#if entry.type === "content"}
{#if entry.value.type === "person"}
<Person bind:value={entry.value} />
{:else if entry.value.type === "school"}
<School bind:value={entry.value} />
{/if}
{/if}
{/each}

<button class="btn btn-primary" on:click={handleSubmit}>Submit</button>

<style>
	.next
	{
		color: white;
		background-color: blue;
		border-radius: 2px;
	}
	
	.next:hover
	{
		background-color: darkblue;
	}
	
	body
	{
		background-image: url(../images/background2.png);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		margin: 0;
		padding: 0;
		font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
	}
</style>