<script lang="ts">
   export let citationList: any[] = [];
   import CitationModal from "../citationIntakeComponents/CitationModal.svelte";

   let show: boolean = false;
   const showModal = () => {
    show = true;
   };

   const removeCitation = (i: number) =>
    {
      citationList = citationList.slice(0, i).concat(citationList.slice(i+1));
    };
</script>

<button class="btn btn-light" on:click={() => showModal()}>Add a citation to this relationship</button>
<CitationModal bind:show = {show} title = "New Citation" bind:citationList={citationList}/>
{#each citationList as citation, i}
<div class = "d-flex">
<div class ="rightspace">- Citation from '{citation.source}' Added</div>
<div><button class = "btn btn-danger btn-xsm" on:click = {() => removeCitation(i)}><div class ="center"><div>x</div></div></button></div>
</div>
{/each}

<style>
   .btn-xsm
   {
      height: 20px;
      width: 20px;
      padding: 0;
   }
   .center
   {
      display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
   }
   .rightspace
   {
      padding-right: 5px;
   }
</style>