<script lang="ts">
	import type { Content } from "src/api/types";
	import Person from "./content/Person.svelte";
	import School from "./content/School.svelte";
	import Institution from "./content/Institution.svelte";

	export let content: Content;
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

