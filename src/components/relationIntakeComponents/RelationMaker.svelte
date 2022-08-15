<script type="ts">
    import { draftForm } from '../../utils/forms/stores';
    import type { Relations } from "src/api/types";
    import RelationBasic from "../../components/relationIntakeComponents/RelationBasic.svelte";
    import { get } from 'svelte/store';
    
    const form = get(draftForm);
    const link_from = form[0];
    
    let displayArray = [];
    
    const debug = () => {
        console.log(link_from);
        console.log(form);
    };
    
    export let value: Relations & {
        content: any,
        };
    
    </script>
    <RelationBasic from={link_from}/>