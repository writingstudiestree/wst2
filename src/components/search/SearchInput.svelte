<script lang="ts">
	import Tags from "svelte-tags-input";
	import type { SearchQuery, SearchResult } from "src/api/search";
	import { createEventDispatcher } from 'svelte';
	import SearchModal from "./SearchModal.svelte";

	const dispatch = createEventDispatcher();

	export let query: SearchQuery;
	$: query.content_tags = tags.join(",");

	let tags: string[] = query.content_tags?.split(",").filter(t => !!t.length) || [];
	let autoComplete: string[] = [];

	let isChanged = false;

	export let showRelationFilter = true;
	let showRelationModal = false;

	function handleRelationModal() {
		showRelationModal = true;
	}

	function handleRelationClick(result: SearchResult) {
		query.relation_with = result.content.id;
		isChanged = true;
		handleSubmit();
	}

	function handleRelationRemove() {
		delete query.relation_with;
		delete query.relation_type;
		isChanged = true;
		handleSubmit();
	}

	function handleKey(event: KeyboardEvent) {
		// when enter key pressed, submit the search
		if (event.key === "Enter" && isChanged)
			dispatch("submit");
	}

	function handleChange() {
		isChanged = true;
	}

	function handleSubmit() {
		if (isChanged)
			dispatch("submit");
	}
</script>

<div class="shadow mb-3">
	<div class="input-group">
		<i class="input-group-text material-icons">search</i>
		<input
			type="text"
			class="form-control"
			placeholder="Search by name..."
			bind:value={query.content_name}
			on:keyup={handleKey}
			on:input={handleChange}
		/>
		<button class="btn btn-primary" on:click={handleSubmit} disabled={!isChanged}>Search</button>
	</div>
</div>

<h1 class="h6 text-primary d-flex align-items-center">
	<i class="material-icons me-1">filter_alt</i>
	Search Filters
</h1>

<div id="filters" class="input-group mb-5">
	<select class="form-select" bind:value={query.content_type} on:change={handleChange}>
		<option value="" selected>Node type...</option>
		<option value="person">Person</option>
		<option value="school">School</option>
		<option value="institution">Non-school Institution</option>
	</select>

	<Tags
		bind:tags={tags}
		on:tags={handleChange}
		addKeys={[13]}
		maxTags={false}
		allowPaste={true}
		allowDrop={true}
		splitWith={", "}
		onlyUnique={true}
		removeKeys={[8]}
		placeholder="Filter by tags..."
		autoComplete={autoComplete}
		name="Tags..."
		allowBlur={true}
		disable={false}
		minChars={0}
		onlyAutocomplete={false}
		labelShow={false}
	/>

	{#if query.relation_with}
	<button class="btn btn-primary d-flex align-items-center" on:click={handleRelationRemove}>
		<i class="material-icons me-2">close</i>
		Remove Relation Filter
	</button>
	{:else if showRelationFilter}
	<button class="btn btn-secondary d-flex align-items-center" on:click={handleRelationModal}>
		<i class="material-icons me-2">manage_search</i>
		Filter by relation...
	</button>
	{/if}
</div>

{#if showRelationFilter}
<SearchModal
	bind:show={showRelationModal}
	onClick={handleRelationClick}
/>
{/if}

<style>
.input-group-text, input.form-control {
	font-size: 1.8rem;
}

#filters {
	display: grid;
	grid-auto-columns: 1fr 2fr 1fr;
	grid-auto-flow: column;
}

#filters select {
	width: auto;
}
</style>
