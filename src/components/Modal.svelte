<script lang="ts">
	export let title: string = "";
	export let show: boolean = false;
</script>

{#if show}
<div class="modal show" tabindex="-1" aria-modal="true" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">{title}</h5>
				<a href="./#" role="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
					<span class="d-none">Close</span>
				</a>
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
