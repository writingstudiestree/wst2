<script lang="ts">
	import type * as search from "src/api/search";

	import Modal from "../Modal.svelte";
	import SearchInput from "./SearchInput.svelte";
	import SearchResult from "./SearchResult.svelte";

	export let show: boolean = false;
	export let query: search.SearchQuery = {};

	let results: search.SearchResult[] = [];

	async function handleSearch() {
		const fetchResponse = await fetch(
			`/api/search?` + new URLSearchParams(query as Record<string, string>).toString()
		).then(r => r.json()).catch((e) => (console.log(e), []));

		results = fetchResponse;
	}

	export let onClick: (result: search.SearchResult) => void;

	function handleClick(result: search.SearchResult) {
		show = false;
		onClick(result);
	}
</script>

<Modal bind:show={show} title="Search for a node..." size="lg">
	<SearchInput
		showRelationFilter={false}
		bind:query={query}
		on:submit={handleSearch} />

	{#if !results.length}
	<div class="py-5 text-center">
		<i class="material-icons display-1 text-secondary">search_off</i>
		<h1>No results found...</h1>
		<p class="text-secondary">Try entering a different query or removing search filters to find more results.</p>
	</div>
	{/if}

	{#each results as result}
	<SearchResult
		{result}
		onClick={handleClick}
	/>
	{/each}
</Modal>
