<script lang="ts">
    export let name: string = "";
    export let ORCiD: string = "";
</script>

<div class="inside">
    <h2>1. Basic Information</h2>
    <p>Enter some basic information about the person being added</p>
    <div>
        <div class="form-group">
        <p><span class="red">*</span>Required fields</p>
        <label for="fullname">Full name<span class="red">*</span></label>
        <input type="text" id="fullname" class="form-control" aria-describedby="enterFullname" bind:value = {name} placeholder="Your preferred name (first and last, if applicable)">
        <br/>
        <label for="orcid">ORCiD</label>
        <input type="text" id="orcid" class="form-control" aria-describedby="enterOrcid" bind:value = {ORCiD}>
        <small id="orcid-tip" class="form-text text-muted">
            An ORCiD is a persistent identifier you control, which can help distinguish you from others with the same name – or match you to your work when your name changes. Learn more or create one at <a href="https://orcid.org/">orcid.org</a>.
        </small>
    </div>
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
        padding-left: 20px;
    }
</style>