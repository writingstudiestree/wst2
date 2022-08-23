<script lang="ts">
   export let citationList: any[] = [];
   import CitationModal from "../citationIntakeComponents/CitationModal.svelte";

   let show: boolean = false;
   let increment = 0;
   const addCitation = () => {
    show = true;
    citationList =  ["string", ...citationList];
    increment = citationList.length;
    console.log(citationList);
   };
</script>

<button class="btn btn-light" on:click={() => addCitation()}>Add a citation to this relationship</button>
<CitationModal bind:show = {show} title = "New Citation"/>