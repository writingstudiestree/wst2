<script>
    export let name;
    export let ORCiD;
    export let pronounceLink;
</script>

<div class = "inside">
    <h1 class = "formType">New Person</h1>
    <h2>1. Basic Informtion</h2>
    <p>Enter some basic information about the person being added</p>
    <div class = "indented">
        <p><span class = "red">*</span>Required fields</p>
        <form>
            <input type = "text" placeholder = "Full name" bind:value = {name}><span class = "red">*</span>
            <p>ORCiD</p>
            <input type = "text" placeholder = "Please enter ORCiD" bind:value = {ORCiD}>
            <span class = "smallText">Don't have one? Create one <a href = "https://orcid.org/">here</a></span>
            <p>Pronounciation Link</p>
            <input type = "text" placeholder = "Please enter a link" bind:value = {pronounceLink}>
            <span class = "smallText">Don't know what this is? Learn more <a href = "https://kairos.technorhetoric.net/scholarnames/">here</a></span>
        </form>
    </div>
</div>

<style>
    .red
    {
        color: red;
    }

    .smallText
    {
        font-size: x-small;
    }

    input
    {
        width: 20%;
    }

    .indented
    {
        padding-left: 20px;
        padding-right: 20px;
    }
</style>