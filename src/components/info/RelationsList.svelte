<script lang="ts">
	import type { SearchResult } from "src/api/search";
	import Relation from "./relation/Relation.svelte";

	export let relations: SearchResult[];

	$: relationTypes = relations.reduce((obj, current) => {
		if (!current.relation) return obj;

		if (current.relation.type in obj)
			obj[current.relation.type].push(current);
		else obj[current.relation.type] = [current];

		return obj;
	}, {} as Record<string, SearchResult[]>);
</script>

{#each Object.entries(relationTypes) as [type, results]}
<h2 class="h4 mb-0">Has {type}...</h2>

<ul>
	{#each results as { content, relation }}
	<li>
		<Relation {content} {relation} />
	</li>
	{/each}
</ul>
{/each}
