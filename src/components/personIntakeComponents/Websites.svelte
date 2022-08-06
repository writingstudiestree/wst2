<script lang="ts">
    export let pronounceLink: string = "";
    export let websites: string[] = [];

    //entered website handling
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
    <h2>2. Websites</h2>
    <p>Where can we find you online?</p>
    <label for="pronounceLinkBox">Pronunciation Link</label>
        <input type="text" id="pronounceLinkBox" class="form-control" aria-describedby="enterOrcid" bind:value = {pronounceLink}>
        <small id="orcid-tip" class="form-text text-muted">
            Don't know what this is? Learn more <a href="https://kairos.technorhetoric.net/scholarnames/">here</a>
        </small>
        <br/>
        <br/>
<label for = "websiteTerminal">Websites</label>
    <div class="input-group mb-3" id="websiteTerminal">
                <input type="text" class="form-control" placeholder="Enter your LinkedIn, Blog, Social Media, Academic Website, etc..." aria-label="Website input" aria-describedby="basic-addon2" bind:value={currWebsite}>
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
</div>

<style>
    .list-group-item:hover
    {
        text-decoration: line-through;
    }
</style>