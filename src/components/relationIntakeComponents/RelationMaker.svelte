<script type="ts">
    import { draftForm } from '../../utils/forms/stores';
    import type { Relations } from "src/api/types";
    import RelationBasic from "../../components/relationIntakeComponents/RelationBasic.svelte";
    import { get } from 'svelte/store';
    
    
    export let value: Relations & {
        content: any,
        };
    
    </script>