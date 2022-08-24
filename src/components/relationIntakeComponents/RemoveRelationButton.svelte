<script type="ts">
    export let id: number;
    let prompt: boolean = false;
    const promptConfirmation = () => {
        prompt = true;
    };
    const cancelDeletion = () => {
        prompt = false;
    };
    import { draftForm } from '../../utils/forms/stores';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
    import { isRecordType, InsertFormType } from 'src/api/forms/base';

    $: form = $draftForm[$page.params.uuid]?.form;

    const deleteRelation = () => {
        for (let i = 0; i < (get(form)).length; i++)
        {
            if(get(form)[i].value.id == id && isRecordType(get(form)[i], InsertFormType.RELATION))
            {
                let found = get(form)
                found = found.slice(0, i).concat(found.slice(i+1));
                form.set(found);
            }
    }
    };
</script>
{#if !prompt}
<button class = "btn btn-danger" on:click = {promptConfirmation}>Delete this relation</button>
{:else}
Are you sure?
<button class = "btn btn-danger" on:click = {deleteRelation}>Yes, delete</button>
<button class = "btn btn-success" on:click = {cancelDeletion}>No, keep it</button>
{/if}