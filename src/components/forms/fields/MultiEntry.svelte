<script lang="ts">
	import FieldContainer from "./FieldContainer.svelte";
	export let field: [number, string];

	export let entriesAsString: String = "";
	export let entriesAsList: string[] = [];

	let entries: string[] = entriesAsList.length ? entriesAsList : entriesAsString.split("|");
	$: entriesAsString = entries.map(s => s.trim()).filter(s => !!s).map(transform).join("|");
	$: entriesAsList = entries.map(s => s.trim()).filter(s => !!s).map(transform);

	$: needsContent = entries[entries.length-1] === "";

	export let label: string = "Section Label";
	export let firstPlaceholder: string = "Enter the first entry here";
	export let nextPlaceholder: string = "Enter a subsequent entry here";
	export let addMessage: string = "+";
	export let required: boolean = true;
	export let transform = (s: string) => s;

	const newField = () => {
		entries = [...entries, ""];
	};
	const deleteField = (i: number) => {
		entries = entries.slice(0, i).concat(entries.slice(i+1));
	};
</script>

<label class="form-label" for="first-entry">
	{label}{#if required}<span class = "text-danger">*</span>{/if}
</label>

<FieldContainer {field} let:errors>
	<span id={field[1]} /> <!-- For obtaining the position to scroll to on an error -->

	{#each entries as _, i}
	<div class="input-group">
		<input
			id={`${field[1]}.${i}`}
			type="text"
			class={"form-control " + (errors.some(e => e.field?.endsWith(`.${i}`) || e.field?.endsWith(field[1])) ? "is-invalid" : "")}
			placeholder={i === 0 ? firstPlaceholder : nextPlaceholder}
			bind:value={entries[i]}
		>
		{#if !required || i !== 0}
			<button class="btn btn-outline-secondary" on:click={() => deleteField(i)} type="button">Delete this entry</button>
		{/if}
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
