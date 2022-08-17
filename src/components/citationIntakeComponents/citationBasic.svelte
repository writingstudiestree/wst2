<script lang="ts">
    export let source: string = "";
    export let description: string = "";
    let selectedSource: string = "";

    $: if (selectedSource !== "Other")
    source = selectedSource;

    const sourceTypes: string[] = ["", "Personal experience / memory", "Curriculum vitae or resume", "Alumni list", "Dissertation, thesis, or similar scholastic record", "Published document, including articles or acknowledgments", "Archival records or papers", "Interview", "Crowdsourced from the first Writing Studies Tree database", "Other"];
</script>

    <p><span class="red">*</span>Required fields</p> 
    <label for="source-select">What is the source of the citation?<span class="red">*</span></label>
    <select class="form-control custom-select" id="source-select" bind:value={selectedSource}>
        {#each sourceTypes as sourceType}
        <option value = {sourceType}>
            {sourceType}
        </option>
        {/each}
    </select>
    {#if selectedSource === "Other"}
    <br/>
    <label for="other">Other<span class="red">*</span></label>
    <input type="text" class="form-control" id="other">
    {/if}
    <br/>
    <label for="additionalDescription">Please provide a link, description, or full citation here: <span class="red">*</span></label>
    <textarea class="form-control" bind:value = {description} id="additionalDescription" rows="3"></textarea>
    <span class = "smallText">If your source is from a website, consider inserting <a href = "https://web.archive.org/save/">a web archive snapshot</a></span>
    <style>
        .red
        {
            color: red;
        }
    </style>