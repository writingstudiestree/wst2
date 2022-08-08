<script lang="ts">
    export let description: string = "";
</script>

<div class = "inside">
    <h2>5. Additional Description</h2>
    <p>Is there any more information you would like to add?</p>   
    <div class="form-group">
        <textarea class="form-control" bind:value = {description} id="additionalDescription" rows="3"></textarea>
        <span class = "smallText">Keep in mind: You'll be forming relationships with other entries in the next step!</span>
    </div>
</div>

<style>
    .smallText
    {
        font-size: small;
    }
</style>