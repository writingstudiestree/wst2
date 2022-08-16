<script lang="ts">
    import { InsertFormType } from 'src/api/forms/base';
    import type { Content } from 'src/api';
    import { draftForm } from '../../utils/forms/stores';
    import { v4 as uuid } from 'uuid';
    import { page } from '$app/stores';
    import { get } from 'svelte/store';

    $: form = $draftForm[$page.params.uuid]?.form;
    export let entry: Content & {
    content: any,
	};

    const addRelation = () =>
    {
        const newId = Math.min(...$form.map(record => record.value.id), -1) - 1;
        console.log($form);
        form.set([...get(form), { type: InsertFormType.RELATION, value: 
            { 
            id: newId,
            type: 'mentored',
            subtype: '',
            link_from: entry.id,
            link_to: 0,
            year_start: 0,
            year_end: null,
            content: {}
            }
        }
        ]);
        console.log($form);
    };
</script>
<button class="btn btn-primary indent" on:click={addRelation}>Next</button>