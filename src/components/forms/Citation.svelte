<script lang="ts">
	import type { Citations } from 'src/api';
	import CitationBasic from '../citationIntakeComponents/citationBasic.svelte';

	export let value: Citations & {
		content: any,
	};
</script>
<CitationBasic/>
