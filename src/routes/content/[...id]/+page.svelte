<script lang="ts">
	import { goto } from "$app/navigation";
	import { InsertFormType } from "src/api/forms/base";
	import Content from "src/components/info/Content.svelte";
	import DeleteModal from "src/components/info/DeleteModal.svelte";
	import { draftForm } from "src/utils/forms/stores";
	import { v4 as uuid } from "uuid";

	import type { PageData } from "./$types";
	export let data: PageData;
	$: ({ content, relations, user } = data);

	function handleEdit() {
		// insert the content entry into a new draft
		const id = uuid();
		draftForm.createForm(id, [{
			type: InsertFormType.CONTENT,
			value: content,
		}]);

		// open the draft form page
		goto(`/forms/${id}`);
	}

	let showDelete = false;
	function handleDelete() {
		// TODO: create API route for node "delete"
		alert("Not implemented");
	}
</script>

<Content {content} {relations} />

{#if user}
<div class="mt-5">
	<button class="btn btn-primary d-inline-flex me-3" on:click={handleEdit}>
		<i class="material-icons me-2">edit</i>
		Edit this entry
	</button>

	<!-- <button class="btn btn-danger d-inline-flex me-3" on:click={() => showDelete = true}>
		<i class="material-icons me-2">delete</i>
		Remove this entry
	</button> -->
</div>
{/if}

{#if showDelete}
<DeleteModal
	bind:show={showDelete}
	on:delete={handleDelete}
/>
{/if}
