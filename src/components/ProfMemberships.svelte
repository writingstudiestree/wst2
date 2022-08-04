<script>
    import Tags from "svelte-tags-input";
    let tag = "";

    function handleTags(event) {
        tag = event.detail.tags;
    }

    //Add memberships from WST 1 here
    let usedTags = ["ATEG", "University of Alaska", "Troy University", "University of Pittsburgh", "Pennslyvania State College"];

</script>

<Tags 
    on:tags={handleTags}
	addKeys={[13]}
	maxTags={false}
	allowPaste={true}
	allowDrop={true}
	splitWith={"|"}
	onlyUnique={true}
	removeKeys={[8]}
	placeholder={"Enter memberships here"}
	autoComplete={usedTags}
	name={"tagsbar"}
	id={Math.random()}
	allowBlur={true}
	disable={false}
	minChars={0}
	onlyAutocomplete={false}
	labelShow={false}
/>