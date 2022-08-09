<script lang="ts">
	import { page } from '$app/stores';
	import { readable } from 'svelte/store';
	import { draftForm } from 'src/utils/forms/stores';

	export let field: string;

	$: errors = draftForm.getForm($page.params.uuid)?.errors;
	$: fieldErrors = $errors?.filter(e => e.field?.startsWith(field));
</script>

<div>
	<slot
		isValid={!(fieldErrors?.length)}
		errors={errors}
	/>

	{#if fieldErrors && fieldErrors.length}
	<div class="invalid-feedback">
		{#each fieldErrors as error}
		<span class="d-block">{error.message}</span>
		{/each}
	</div>
	{/if}
</div>
