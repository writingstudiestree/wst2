<script lang="ts">
	import type { Content } from "src/api/types";
	import Person from "./content/Person.svelte";
	import School from "./content/School.svelte";
	import Institution from "./content/Institution.svelte";
	import RelationsList from "./RelationsList.svelte";

	export let content: Content;

	import type { SearchResult } from "src/api/search";

	export let relations: SearchResult[];
</script>

{#if content.type === "person"}
<Person {content} />
{/if}

{#if content.type === "school"}
<School {content} />
{/if}

{#if content.type === "institution"}
<Institution {content} />
{/if}

<RelationsList {relations} />

<div>
	<small>Created on <time datetime={new Date(content.date_created).toISOString()}>{new Date(content.date_created)}</time>.</small>
	{#if content.date_created.toString() !== content.date_modified.toString()}
		<br>
		<small>Last updated on <time datetime={new Date(content.date_modified).toISOString()}>{new Date(content.date_modified)}</time>.</small>
	{/if}
</div>

