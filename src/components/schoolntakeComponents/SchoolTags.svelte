<script lang="ts">
    import Tags from "svelte-tags-input";

    export let enteredTags: string[] = [];

    function addInterest(event: any) {
        enteredTags = event.detail.tags;
    }

    //Add tags from WST 1 here
    let interestTags = ["African American Rhetoric", "Basic Writing", "Big Data", "19th Century"];

</script>

<div class = "inside">
    <h2>3. Areas of Interest or Identity</h2>
        <p>What keywords would you use to describe this institution?</p>
        <Tags
        on:tags={addInterest}
        addKeys={[13]}
        maxTags={false}
        allowPaste={true}
        allowDrop={true}
        splitWith={"|"}
        onlyUnique={true}
        removeKeys={[8]}
        placeholder={"Enter multiple descriptions here. (Press enter to add an entry)"}
        autoComplete={interestTags}
        name={"interestBar"}
        id={Math.random()}
        allowBlur={true}
        disable={false}
        minChars={0}
        onlyAutocomplete={false}
        labelShow={false}/>
        <span class = "smallText">Not sure what to put here? Start typing and see which tags other users have used before!</span>
</div>

    <style>
        .smallText
        {
            font-size: small;
        }
    </style>
