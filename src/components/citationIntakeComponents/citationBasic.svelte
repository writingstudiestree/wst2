<script lang="ts">
    export let name: string = "";
    export let collection: string = "";
    export let description: string = "";

    let node1 = "";
    let node2 = "";
    let nodeList = ['Pitt', 'Penn State', 'Donald']

    import AutoComplete from "simple-svelte-autocomplete";
</script>

<div class="inside">
    <p><span class="red">*</span>Required fields</p>
    <div class = "inception">
        <div>I want to add a citation for the relationship between 
            <AutoComplete bind:selectedItem={node1} items="{nodeList}" hideArrow={true}/> and 
            <AutoComplete bind:selectedItem={node2} items="{nodeList}" hideArrow={true}/></div>
            {#if node1 != "" && node2 != ""}
            <br/>
            <label for="node-select">Please specify which relationship you would like to add a citation to</label>
            <select class="form-control custom-select" id="node-select"/>
            {/if}
    </div>
    <label for="name">Citation Author<span class="red">*</span></label>
    <input type="text" id="name" class="form-control" aria-describedby="enterName" bind:value = {name} placeholder="Your preferred name (first and last, if applicable)">
    <br/>
    <label for="container-select">Collection</label>
    <select class="form-control custom-select" id="container-select" bind:value={collection}>
        <option value="Personal experience">Personal experience</option>
        <option value="Exists in archived site">Exists in archived site</option>
    </select>
    <br/>
    <label for="additionalDescription">Additional description</label>
    <textarea class="form-control" bind:value = {description} id="additionalDescription" rows="3"></textarea>
</div>
<style>
    .red
    {
        color: red;
    }

    .inception 
    {
	border-radius: 10px;
	width: 100%;
	border: 1px solid grey;
	height: auto;
	padding: 2%;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 20px;
	background-color: white;
	opacity: 0.95;
    }
</style>