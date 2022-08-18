<script lang="ts">
	import Modal from "../Modal.svelte";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let show: boolean = false;

	let confirm = "";
	$: confirmValid = confirm.toLowerCase().includes("delete this entry");

	function handleClose() {
		show = false;
		dispatch("close");
	}

	function handleDelete() {
		if (confirmValid)
			dispatch("delete");
	}
</script>

<Modal bind:show={show} title="Delete this entry?">
	<p>Are you sure that you want to delete this entry? This action <strong>cannot</strong> be undone.</p>
	<p>Please type "<strong>delete this entry</strong>" to confirm.</p>

	<input type="text" class="form-control" bind:value={confirm} />

	<div slot="footer">
		<button class="btn btn-secondary d-inline-flex me-3" on:click={handleClose}>
			Cancel
		</button>

		<button class="btn btn-danger d-inline-flex" on:click={handleDelete} disabled={!confirmValid}>
			<i class="material-icons me-2">delete</i>
			Delete
		</button>
	</div>
</Modal>

