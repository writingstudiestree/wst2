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
        <input type="text" id="pronounceLinkBox" class="form-control" aria-describedby="pronounce-tip" bind:value = {pronounceLink}>
        <small id="pronounce-tip" class="form-text text-muted">
            NB: THIS SHOULD PROBABLY BE UNDER BASIC INFORMATION, RATHER THAN WEBSITES. Is there a recording of this person's name at <a href="https://kairos.technorhetoric.net/scholarnames/">Kairos ScholarNames</a> or elsewhere? Please share a link here.
        </small>
        <br/>
        <br/>
<label for = "websiteTerminal">Websites</label>
    <div class="input-group mb-3" id="websiteTerminal">
                <input type="text" class="form-control" placeholder="Enter your LinkedIn, Blog, Social Media, Academic Website, etc. One at a time, please!" aria-label="Website input" aria-describedby="basic-addon2" bind:value={currWebsite}>
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" on:click = {addSite}>Add website</button>
                </div>
            </div>
            <div class="list-group indented">
                {#if websites.length > 0}
                    <span>Your website list (Click to remove entries)</span>
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

    .indented
    {
        margin-left: 20px;
    }
</style>
