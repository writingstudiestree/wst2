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
    <p>Let's start with some basic information about the school or university</p>
    <div>
        <form>
            <div class="form-group">
                <label for="schoolName">Name of school or university</label>
                <input type="text" class="form-control" id="schoolName" placeholder="Name" bind:value = {name}>
            </div>
            <br/>
            <label for = "websiteTerminal">Websites</label>
            <div class="input-group mb-3" id="websiteTerminal">
                <input type="text" class="form-control" placeholder="You can enter one or more websites here" aria-label="Website input" aria-describedby="basic-addon2" bind:value={currWebsite}>
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

    .smallText
    {
        font-size: x-small;
    }

    .indented
    {
        margin-left: 30px;
    }

    .list-group-item:hover
    {
        text-decoration: line-through;
    }
</style>