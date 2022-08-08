<script lang="ts">
    import Tags from "svelte-tags-input";
    
    export let enteredTags: string[] = [];
    
    let itsMe = false;
    function addInterest(event: any) {
        enteredTags = event.detail.tags;
    }
    
    //Add tags from WST 1 here
    let interestTags = ["LGBTQ+", "He/him", "She/her", "They/them", "African American"];
    
</script>

<div class = "inside">
    <h2>4. Self-indentification</h2>
    <p>How do you self-identify?</p>
        <label>
        <input type=checkbox bind:checked={itsMe}>
        I am entering myself in this form
        </label>
        <Tags 
        on:tags={addInterest}
        addKeys={[13]}
        maxTags={false}
        allowPaste={true}
        allowDrop={true}
        splitWith={"|"}
        onlyUnique={true}
        removeKeys={[8]}
        disable={!itsMe}
        placeholder={"Press enter to add an entry. Add multiple!"}
        autoComplete={interestTags}
        name={"interestBar"}
        id={Math.random()}
        allowBlur={true}
        minChars={0}
        onlyAutocomplete={false}
        labelShow={false}/>
        <span class = "smallText">Not sure what to put here? Start typing and see which tags other users have used before!</span>
</div>
    
    <style>
        .smallText
        {
            font-size: x-small;
        }
</style>