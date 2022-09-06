<script lang="ts">
	import type { Content, Relations } from "src/api";


	export let content: Content;
	export let relation: Relations | undefined;
</script>

<a href={`/content/${content.id}`}>
	{content.name?.split("|")[0] || ""},
</a>

{#if relation}
<a class="text-muted" href={`/relation/${relation.id}`}>
	{relation.subtype},
	<time datetime={relation.year_start + ""}>{relation.year_start}</time>
	-
	{#if relation.year_end}
	<time datetime={relation.year_end + ""}>{relation.year_end}</time>
	{:else}
	Ongoing
	{/if}
</a>
{/if}
