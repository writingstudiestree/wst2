<script lang="ts">
    export let name: string = "";
    export let websites: string[] = [];
    let currWebsite: string = "";

    const addSite = () =>
    {
        if (currWebsite != "" && currWebsite != undefined)
        websites = [currWebsite, ...websites];
        currWebsite = "";
    };

    const removeSite = (index: number) =>
    {
        websites = websites.slice(0, index).concat(websites.slice(index+1));
        console.log(index)
        console.log(websites);
    }
</script>

<div class="inside">
    <h2>1. Basic Information</h2>
    <p>Let's start with some basic information about the institution</p>
    <p><span class="red">*</span>Required fields</p>
    <div>
        <form>
            <div class="form-group">
                <label for="schoolName">Name of institution<span class="red">*</span></label>
                <input type="text" class="form-control" id="schoolName" placeholder="Please avoid acronyms and abbreviations" bind:value = {name} required>
            </div>
            <br/>
            <label for = "websiteTerminal">Websites</label>
            <div class="input-group mb-3" id="websiteTerminal">
                <input type="text" class="form-control" placeholder="Enter institution site, social media, etc." aria-label="Website input" aria-describedby="basic-addon2" bind:value={currWebsite}>
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" on:click = {addSite}>Add website</button>
                </div>
            </div>
            <div class="list-group indented">
                {#if websites.length > 0}
                    <span>Your websites (Click to remove entries)</span>
                    {#each websites as site, i}
                    <button type="button" on:click = {() => removeSite(i)} class="list-group-item list-group-item-action">{site}</button>
                    {/each}
                {/if}
            </div>
        </form>
    </div>
</div>

<style>
    .red
    {
        color: red;
    }

    .indented
    {
        margin-left: 20px;
    }

    .list-group-item:hover
    {
        text-decoration: line-through;
    }
</style>
