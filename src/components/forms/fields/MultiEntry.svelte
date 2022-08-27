<script lang="ts">
	import FieldContainer from "./FieldContainer.svelte";
	export let field: [number, string];

	export let entriesAsString: String = "";
	$: entriesAsString = entriesAsList.map(s => s.trim()).filter(s => !!s).join("|");

	export let entriesAsList: string[] = entriesAsString.split("|") || [""];
	$: needsContent = entriesAsList[entriesAsList.length-1] === "";

	export let label: string = "Section Label";
	export let firstPlaceholder: string = "Enter the first entry here";
	export let nextPlaceholder: string = "Enter a subsequent entry here";
	export let addMessage: string = "+";
	export let required: boolean = true;

	const newField = () => {
		entriesAsList = [...entriesAsList, ""];
	};
	const deleteField = (i: number) => {
		entriesAsList = entriesAsList.slice(0, i).concat(entriesAsList.slice(i+1));
	};
</script>

<label class="form-label" for="first-entry">
	{label}{#if required}<span class = "text-danger">*</span>{/if}
</label>

<FieldContainer {field} let:errors>
	{#each entriesAsList as entry, i}
	<div class="input-group">
		<input
			type="text"
			class={"form-control " + (errors.some(e => e.field?.endsWith(`.${i}`)) ? "is-invalid" : "")}
			placeholder={i === 0 ? firstPlaceholder : nextPlaceholder}
			bind:value={entriesAsList[i]}
		>
		<button class="btn btn-outline-secondary" on:click={() => deleteField(i)} type="button">Delete this entry</button>
	</div>
	{/each}

	<button
		class="btn btn-outline-secondary"
		on:click={newField}
		type="button"
		disabled={needsContent}
	>
		{addMessage}
	</button>
</FieldContainer>
