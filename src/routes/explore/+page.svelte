<script lang="ts">
	import SearchInput from "src/components/search/SearchInput.svelte";
	import SearchResult from "src/components/search/SearchResult.svelte";

	import type { PageData } from "./$types";
	export let data: PageData;
	$: ({ results } = data);
</script>

<div class="container">
	<SearchInput />
</div>

<div class="container">
	{#each results as result}
	<SearchResult {result} />
	{/each}
</div>
