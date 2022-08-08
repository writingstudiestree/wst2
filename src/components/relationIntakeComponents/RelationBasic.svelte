<script lang="ts"> 
    export let from: any;
    let link_to = {
        id: 0,
        name: "",
        type: "none"
    };
    let targetType: string = "";
    let exampleNodeList = [
        { id: 1, name: "Jeff", type: "person" },
        { id: 2, name: "Nick", type: "person" },
        { id: 3, name: "Pitt", type: "school" },
        { id: 4, name: "Penn State", type: "school" },
        { id: 5, name: "Temple", type: "school" },
        { id: 6, name: "Joshua", type: "person" },
        { id: 6, name: "Boy Scouts of America", type: "institution" },
        { id: 6, name: "Book Club", type: "institution" }
    ]
    let filteredNodes: Object[] = [];
    $: filteredNodes = exampleNodeList.filter(node => node.type === targetType);

    import AutoComplete from "simple-svelte-autocomplete";

</script>
<div class = "inside">
    <h2>Forming relationships</h2>
    <p>Now that your node has been created, it is time to start forming relationships within the network! Using the forms below, create as many possible connections to other entries.</p>
    <div class = "inception">
        <div>I want to create a relationship between [nodeName] and a 
            <select class="form-control smaller form-control-sm" bind:value={targetType}>
                <option></option>
                <option value = "person">Person</option>
                <option value = "school">School or University</option>
                <option value = "institution">Non-school institution</option>
              </select>
             named 
            <AutoComplete 
            hideArrow={true} 
            labelFieldName="name"
            items="{filteredNodes}"
            bind:selectedItem="{link_to}" 
            itemFilterFunction={"type" === targetType}/>
        </div>
        {#if link_to.name != ""}
        <br/>
        <div>
            How would you describe this relationship?
            <div>[nodeName] <select><option>Example</option><select/> {link_to.name}</div>
        </div>
        {/if}
    </div> 
</div>
<button on:click={() => console.log(link_to)}>debug</button>
<style>
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

    .smaller
    {
        width: 150px;
        display: inline-block;
    }
</style>