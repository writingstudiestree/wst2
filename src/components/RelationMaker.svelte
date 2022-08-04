<script>
    import AutoComplete from "simple-svelte-autocomplete";
    export let typeOfForm;
    export let newEntry;
    let visibleArray = ["John", "Dominic", "Stacy", "Josh"]
    let targetType;
    let target;
    let relationship;
    let qualifier;

    let handleSubmit = () =>
    {
        relationship = "";
        qualifier = "";
    };
</script>

<div class = "inside">
    <h1 class = "formType">New {typeOfForm}</h1>
    <h2>2. Make Relationships</h2>
    <p>Your new entry, {newEntry}, has been successfully submitted into the database. Hooray!</p>
    <p>Now for the fun part: connect your new entry to nodes within the tree. Use the dropdown menus below to establish relationships in the network.</p>
    <div class = "inception">
    <form>
        <label>
        Connect {newEntry} to a
        <select bind:value = {targetType}>
            <option value = "Person">Person</option>
            <option value = "School">School or Academic Institution</option>
            <option value = "Institution">Non-academic Institution</option>
        </select>
        node
        </label>
        <p>Search for a node within this category:</p>
            <AutoComplete items="{visibleArray}" bind:selectedItem="{target}"/>

        {#if target != undefined}
        <br/>
        <h3>What is the relationship between these two entries?</h3>
        <label>
            {newEntry}
            <select bind:value = {relationship}>
                <option value = ""></option>
                <option value = "Mentored">Mentored </option>
                <option value = "Worked Alongside">Worked Alongside</option>
            </select>
            {target}
            <select bind:value = {qualifier}>
                <option value = ""></option>
                <option value = "as dissertation chair">as dissertation chair</option>
                <option value = "as a non-chair member of the dissertation committee">as a non-chair member of the dissertation committee</option>
                <option value = "as a writing program administrator">as a writing program administrator</option>
            </select>
        </label>
        <br/>
        <br/>
        <button on:click|preventDefault = {handleSubmit}>Enter relationship</button>
        {/if}
    </form>
    </div>
    <button on:click|preventDefault = {handleSubmit}>Finish making connections and return to home page</button>
</div>
<style>
.inside {
    width: 80%;
    border: 2px solid black;
    height: auto;
    padding: 2%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    background-color: white;
    opacity: 0.92;
    margin-top: 40px;
    }
    .formType
    {
        text-align: center;
    }
.inception{
    width: 90%;
    border: 2px solid black;
    height: auto;
    padding: 3%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    background-color: white;
    opacity: 0.92;
}
</style>