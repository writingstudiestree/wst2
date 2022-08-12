<script lang="ts">
    import Tags from "svelte-tags-input";
    
    export let enteredTags: string[] = [];

    export let autoComplete: string[] = [];
    export let placeholder: string = "Press enter to add an entry. Add multiple!";

    function addInterest(event: any) {
        enteredTags = event.detail.tags;
    }
</script>
        <Tags 
        on:tags={addInterest}
        addKeys={[13]}
        maxTags={false}
        allowPaste={true}
        allowDrop={true}
        splitWith={", "}
        onlyUnique={true}
        removeKeys={[8]}
        placeholder={placeholder}
        autoComplete={autoComplete}
        name={"interestBar"}
        id={Math.random()}
        allowBlur={true}
        disable={false}
        minChars={0}
        onlyAutocomplete={false}
        labelShow={false}/>
        <span class = "smallText">Not sure what to put here? Start typing and see which tags other users have used before!</span>