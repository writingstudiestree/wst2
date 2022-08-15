<script lang="ts">
    import { InsertFormType } from 'src/api/forms/base';
    import type { Content } from 'src/api';
    import { draftForm } from '../../utils/forms/stores';
    import { v4 as uuid } from 'uuid';

    let form = draftForm.getForm
    export let cont: boolean = true;
    export let entry: Content & {
    content: any,
	};


    const saveAndcont = () =>
    {
        /*form = [...form, { type: InsertFormType.RELATION, value: 
            { 
            id: uuid(),
            type: 'mentored',
            subtype: '',
            link_from: entry.id,
            link_to: 0,
            year_start: 0,
            year_end: null,
            content: {}
            }
        ];*/
        console.log(form);
        cont = true;
    };
</script>
<button class="btn btn-primary indent" on:click={saveAndcont}>Save and continue</button>