<script lang="ts">
	import SearchResult from "src/components/search/SearchResult.svelte";

	import type { PageData } from "./$types";
	export let data: PageData;
	$: ({ relation, content_from, content_to } = data);
</script>

<h1>
	{content_from.name?.split("|")[0]}
	{relation.type}
	{content_to.name?.split("|")[0]}
</h1>

<h2 class="text-secondary h4 mb-5">
	{relation.subtype},
	<time datetime={relation.year_start + ""}>{relation.year_start}</time>
	-
	{#if relation.year_end}
	<time datetime={relation.year_end + ""}>{relation.year_end}</time>
	{:else}
	Ongoing
	{/if}
</h2>

<SearchResult result={{ content: content_from }} />
<SearchResult result={{ content: content_to }} />

<div>
	<small>Created on <time datetime={new Date(relation.date_created).toISOString()}>{new Date(relation.date_created)}</time>.</small>
	{#if relation.date_created.toString() !== relation.date_modified.toString()}
		<br>
		<small>Last updated on <time datetime={new Date(relation.date_modified).toISOString()}>{new Date(relation.date_modified)}</time>.</small>
	{/if}
</div>
