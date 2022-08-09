<script lang="ts">
	import { page } from '$app/stores';
	import { draftForm } from 'src/utils/forms/stores';

	export let field: string;

	$: errors = draftForm.getForm($page.params.uuid)?.errors;
	$: fieldErrors = $errors?.filter(e => e.field?.startsWith(field)) || [];
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
