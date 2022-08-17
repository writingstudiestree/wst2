<script lang="ts">
	import type { Citations } from 'src/api';
	import CitationBasic from '../citationIntakeComponents/citationBasic.svelte';
	export let show = true;
	export let value: Citations & {
		content: any,
	};
</script>
<CitationBasic/>
<button class="btn btn-primary btn-sm topmargin" on:click={() => show = false}>Save and Close</button>
<style>
	.topmargin
	{
		margin-top: 15px;
	}
</style>