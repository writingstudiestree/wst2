<script lang="ts">

	export let show = true;
	
</script>

<button class="btn btn-primary btn-sm topmargin" on:click={() => show = false}>Save and Close</button>
<style>
	.topmargin
	{
		margin-top: 15px;
	}
</style>