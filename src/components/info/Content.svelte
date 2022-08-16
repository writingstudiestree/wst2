<script lang="ts">
	import type { Content } from "src/api/types";
	import Person from "./content/Person.svelte";

	export let content: Content;
</script>

{#if content.type === "person"}
<Person {content} />
{/if}

