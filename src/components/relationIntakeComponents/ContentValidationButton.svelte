<script lang="ts">
	import type { Content } from 'src/api';
	import { page } from '$app/stores';
	import { draftForm } from 'src/utils/forms/stores';
	
    export let nextFlag;


	$: errors = draftForm.getForm($page.params.uuid)?.errors;

    const nextStep = () =>
	{
		/*console.log($errors);
		if ($errors.length == 0)
		{*/
		nextFlag = true;
		/*}
		else
		{
			let failedFields: string = "";
			for (let i = 0; i < $errors.length; i++)
			failedFields +="-"+$errors[i].field + "\n";
			alert("Please make sure to fill out the following required fields:\n"+failedFields);
		}*/
	};
</script>
<button class="btn btn-primary" on:click={() => nextStep()}>Next</button>