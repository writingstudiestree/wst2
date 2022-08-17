<script lang="ts">
   export let citationList: any[] = [];
   import Citation from "../forms/Citation.svelte";
   import Modal from "../Modal.svelte";
   let show: boolean = false;
   let increment = 0;
   const addCitation = () => {
    show = true;
    increment = citationList.length;
    console.log(citationList);
   };
</script>

<button class="btn btn-light" on:click={() => addCitation()}>Add a citation to this relationship</button>
<Modal bind:show = {show} title = "New Citation">
    <Citation bind:value={citationList[increment]} bind:show={show}/>
</Modal>