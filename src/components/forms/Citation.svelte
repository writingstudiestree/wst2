<script lang="ts">
	import type { Citations } from '../../api/types';
    import CitationBasic from '../citationIntakeComponents/citationBasic.svelte';

    export let value: Citations & {
    content: any,
	};
</script>
<h1 class="textCenter">Add a Citation</h1>
<CitationBasic/>