<script lang="ts">
    import Tags from "svelte-tags-input";
    let tag = "";
    let itsMe = false;
    
    export let enteredTags: string[] = [];
    
    function addInterest(event: any) {
        tag = event.detail.tags;
        interestTags = [tag, ...interestTags];
        enteredTags = [tag, ...enteredTags];
    }
    
    function addIdentity(event: any) {
        tag = event.detail.tags;
        identityTags = [tag, ...identityTags];
        enteredTags = [tag, ...enteredTags];
    }
    
    //Add tags from WST 1 here
    let interestTags = ["African American Rhetoric", "Basic Writing", "Big Data", "19th Century"];
    let identityTags = ["LGBTQ+", "Person of Color", "First-generation immigrant"];
    
</script>

<div class = "inside">
    <h2>2. Identity and Interests</h2>
    <div class = "indented">
        <p>What areas of interest or focus does this person have?</p>
        <Tags 
        on:tags={addInterest}
        addKeys={[13]}
        maxTags={false}
        allowPaste={true}
        allowDrop={true}
        splitWith={"|"}
        onlyUnique={true}
        removeKeys={[8]}
        placeholder={"Enter multiple interests here. (Press enter to add an entry)"}
        autoComplete={interestTags}
        name={"interestBar"}
        id={Math.random()}
        allowBlur={true}
        disable={false}
        minChars={0}
        onlyAutocomplete={false}
        labelShow={false}/>
        <span class = "smallText">Not sure what to put here? Start typing and see which tags other users have used before!</span>
        <br/>
        <br/>
        <br/>
        <label>
            <input type=checkbox bind:checked={itsMe}>
            I am entering myself in this form
        </label>
        <p>How would this person identify?</p>
        <Tags 
        on:tags={addIdentity}
        addKeys={[13]}
        maxTags={false}
        allowPaste={true}
        allowDrop={true}
        splitWith={"|"}
        onlyUnique={true}
        removeKeys={[8]}
        placeholder={"Enter identity features here"}
        autoComplete={identityTags}
        name={"identityBar"}
        id={Math.random()}
        allowBlur={true}
        disable={!itsMe}
        minChars={0}
        onlyAutocomplete={false}
        labelShow={false}/>
        <span class = "smallText">Not sure what to put here? Start typing and see which tags other users have used before!</span>
    </div>
</div>
    
    <style>
        .smallText
        {
            font-size: x-small;
        }
        
        .indented
        {
            padding-left: 20px;
            padding-right: 20px;
        }
    </style>