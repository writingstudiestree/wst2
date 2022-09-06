<script lang="ts">
	import type { SearchResult } from "src/api/search";

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
		<a href={`/content/${content.id}`}>
			{content.name?.split("|")[0] || ""},
		</a>
		{#if relation}
		<span class="text-muted">
			{relation.subtype},
			<time datetime={relation.year_start + ""}>{relation.year_start}</time>
			-
			{#if relation.year_end}
			<time datetime={relation.year_end + ""}>{relation.year_end}</time>
			{:else}
			Current
			{/if}
		</span>
		{/if}
	</li>
	{/each}
</ul>
{/each}
