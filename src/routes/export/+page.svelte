<script lang="ts">
	import Export from "src/components/export/Export.svelte";

	import type { PageData } from "./$types";
	export let data: PageData;
	$: ({ user } = data);
</script>

<Export isLoggedIn={!!user} />
