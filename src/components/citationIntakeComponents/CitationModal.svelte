<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import type { Citations } from 'src/api';

	const dispatch = createEventDispatcher();

    export let citation = {source: "", description: ""};

	export let title: string = "";
	export let show: boolean = false;

	function handleClose() {
		dispatch("close");
		show = false;
	}
</script>

{#if show}
<div class="modal show" tabindex="-1" aria-modal="true" role="dialog" on:click={(e) => e.target === e.currentTarget && handleClose()}>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">{title}</h5>
				<button class="btn-close" data-bs-dismiss="modal" aria-label="Close" on:click={handleClose}>
					<span class="d-none">Close</span>
				</button>
			</div>
			<div class="modal-body">
				<slot/>
			</div>
			{#if $$slots.footer}
			<div class="modal-footer">
				<slot name="footer"/>
			</div>
			{/if}
		</div>
	</div>
</div>
{/if}

<style lang="scss">
.modal.show {
	display: block;
	background-color: rgba(0, 0, 0, 0.5);
}
</style>
