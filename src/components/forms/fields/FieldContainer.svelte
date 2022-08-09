<script lang="ts">
	import { page } from '$app/stores';
	import { draftForm } from 'src/utils/forms/stores';

	export let field: [number, string];

	// hide errors until user has interacted with the input
	let displayErrors = false;

	function handleFocus() {
		displayErrors = true;
	}

	$: errors = draftForm.getForm($page.params.uuid)?.errors;
	$: fieldErrors = (displayErrors && $errors?.filter(e => e.key === field[0] && e.field?.startsWith(field[1]))) || [];
</script>

<div on:focusin={handleFocus}>
	<slot
		isValid={!(fieldErrors.length)}
		errors={errors}
	/>

	<div class="invalid-feedback d-block mb-2">
		{#each fieldErrors as error}
		<span class="me-4">{error.message}</span>
		{/each}
		&nbsp;
	</div>
</div>
