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

{#each results as result}
<SearchResult {result} />
{/each}
