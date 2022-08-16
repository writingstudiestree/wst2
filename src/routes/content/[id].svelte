<script lang="ts">
	import type * as api from "src/api";
	import Content from "src/components/info/Content.svelte";

	export let content: api.Content;

	function handleEdit() {
		// TODO: insert "content" into $draftForm as a form entry
		// TODO: handle updates to existing nodes within insertForm functionality to support editing content
		alert("Not implemented");
	}
</script>

<Content {content} />


<div class="mt-5">
	<button class="btn btn-primary d-flex" on:click={handleEdit}>
		<i class="material-icons me-2">edit</i>
		Edit this entry
	</button>
</div>
