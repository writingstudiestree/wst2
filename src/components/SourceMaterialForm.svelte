<script>

    import { createEventDispatcher } from 'svelte'

    let sourceType;
    let source;
    let description;
    
    let dispatch = createEventDispatcher();

    const validateSubmission = () => {
        let valid = true;
        let errorMessage = "ERROR! The following fields are required: "
        if (sourceType == undefined)
        {
            valid = false;
            errorMessage += "\n-Source type (dropdown menu)"
        }
        if (source == "" || source == undefined)
        {
            valid = false;
            errorMessage += "\n-Brief source description or file upload"
        }
        if (description == "" || description == undefined)
        {
            valid = false;
            errorMessage += "\n-Additional Description"
        }
        if (!valid)
        {
            alert(errorMessage);
        }
        return valid;;
    };

    const handleSubmit = () => {
        if (validateSubmission())
        {
        console.log("Submission successful");
        const sourceMaterial = {
            id: "sourceMaterial" + Date.now() + "x" + Math.random(),
            type: "sourceMaterial",
            sourceType,
            source,
            description
        }
        dispatch('addSourceMaterial', sourceMaterial)
    }
    };

</script>

<div class = "inside">
    <h1 class = "formType">New Source Material Or Citation</h1>
    <h2>1. Enter Information</h2>
    <p><span class = "red">*</span>Required fields</p>
<form>
    <p>Source<span class = "red">*</span></p>
    <select bind:value = {sourceType}>
        <option value = "undefined"></option>
        <option value = "Experience">Personal Experience</option>
        <option value = "Site">Exists in an archived site</option>
        <option value = "Doc">Exists in published document</option>
    </select>
    {#if sourceType == "Experience"}
    <input class = "larger" type = "text" placeholder = "Briefly describe experience" bind:value = {source} required>
    {:else if sourceType == "Site"}
    <input class = "larger" type = "text" placeholder = "Paste url or briefly describe source" bind:value = {source} required>
    {:else if sourceType == "Doc"}
    <label>
        <br/>
        Upload file here (PDF accepted)
        <input type = "file" accept = "pdf" bind:value = {source}/>
    </label>
    {/if}
    <p>Additional description<span class = "red">*</span></p>
    <textarea class = "fill" type = "text" placeholder = "Add additional description here" bind:value = {description}/>
    <br/>
    <br/>
    <button on:click|preventDefault = {handleSubmit}>Next</button>
</form>
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
    }
    .red{
        color: red;
    }
    .fill {
        overflow-y:auto;
        height: 80px;
        width: 100%;
    }
    .larger
    {
        width: 700px;
    }
    .formType
    {
        text-align: center;
    }
    </style>