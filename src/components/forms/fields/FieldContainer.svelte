<script lang="ts">
	import { page } from '$app/stores';
	import { draftForm } from 'src/utils/forms/stores';

	export let field: [number, string];

	$: errors = draftForm.getForm($page.params.uuid)?.errors;
	$: fieldErrors = $errors?.filter(e => e.key === field[0] && e.field?.startsWith(field[1])) || [];
</script>

<div>
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
