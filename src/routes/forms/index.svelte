<script>
import { goto } from "$app/navigation";

    import Heading from "../components/header.svelte";
    let formType;

    const provideForm = () => 
    {
        if (formType == "no value")
        {
            //do nothing
        }
        else if (formType == "person")
        {
            goto("/personIntake");
        }
    }
</script>
<body>
    <Heading/>
    <div class = "inside">
        <h2>Add a new entry here</h2>
        <p>Please select the type of entry you would like to create from the list below:</p>
        <select class = "largeSelect" bind:value = {formType}>
            <option value = "no value"></option>
            <option value = "person">Add a new person</option>
            <option value = "school">Add a new school or university</option>
            <option value = "institution">Add a new non-school institution</option>
            <option value = "citation">Add a citation to an existing entry</option>
        </select>
        <button class = "go" on:click = {provideForm}>Go</button>
    </div>
    <div class = "inside">
        <h2>Want to edit an existing entry instead?</h2>
        <p>Click <a href = "https://writingstudiestree.org/">here</a> to be sent to our edit page instead.</p>
    </div>
</body>
<style>
    .inside 
    {
        
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

    .largeSelect
    {
        width: 70%;
        font-size: large;
    }

    .go
    {
        width: 28%;
        font-size: large;
    }

    body
    {
        background-image: url(../images/background2.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        margin: 0;
        padding: 0;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
</style>