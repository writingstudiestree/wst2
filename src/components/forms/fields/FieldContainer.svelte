<script lang="ts">
	import { page } from '$app/stores';
	import { draftForm } from 'src/utils/forms/stores';

	export let field: [number, string];

	// hide errors until user has interacted with the input
	export let displayErrors = false;
	$: displayErrors = displayErrors || !!($state?.displayErrors);

	function handleFocus() {
		displayErrors = true;
	}

	$: errors = draftForm.getForm($page.params.uuid)?.errors;
	$: state = draftForm.getForm($page.params.uuid)?.state;
	$: fieldErrors = (displayErrors && $errors?.filter(e => e.key === field[0] && e.field?.startsWith(field[1]))) || [];
</script>
<div class = "containerStyle">
<div on:focusin={handleFocus}>
	<slot
		isValid={!(fieldErrors.length)}
		errors={fieldErrors}
	/>

	<div class="invalid-feedback d-block mb-2">
		{#each fieldErrors as error, i}
		{#if i === 0} <!-- Prevent repitition of errors in MultiEntries -->
		<span class="me-4">{error.message}</span>
		{/if}
		{/each}
		&nbsp;
	</div>
</div>
</div>
<style>
	.containerStyle
	{
		width: auto;
	}
</style>
