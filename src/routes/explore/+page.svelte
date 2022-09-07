<script lang="ts">
	import SearchInput from "src/components/search/SearchInput.svelte";
	import SearchResult from "src/components/search/SearchResult.svelte";

	import type { PageData } from "./$types";
	export let data: PageData;
	$: ({ results, query } = data);

	function handleSubmit() {
		const params = new URLSearchParams(query as Record<string, string>).toString();
		window.location.search = params;
	}
</script>

<SearchInput
	bind:query={query}
	on:submit={handleSubmit}
/>

{#if !results.length}
<div class="py-5 text-center">
	<i class="material-icons display-1 text-secondary">search_off</i>
	<h1>No results found...</h1>
	<p class="text-secondary">Try entering a different query or removing search filters to find more results.</p>
</div>
{/if}

{#each results as result}
<SearchResult {result} />
{/each}
