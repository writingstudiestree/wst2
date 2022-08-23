<script lang="ts">
   export let citationList: any[] = [];
   import CitationModal from "../citationIntakeComponents/CitationModal.svelte";

   let show: boolean = false;
   const showModal = () => {
    show = true;
   };
</script>

<button class="btn btn-light" on:click={() => showModal()}>Add a citation to this relationship</button>
<CitationModal bind:show = {show} title = "New Citation" bind:citationList={citationList}/>
{#each citationList as citation}
<div>Citation from '{citation.source}' Added</div>
{/each}