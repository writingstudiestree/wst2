<script type="ts">
    import AutoComplete from "simple-svelte-autocomplete";

    import type { Relations } from "src/api/types";
import CitationAddButton from "./CitationAddButton.svelte";
    export let value: Relations & {
        content: any,
        };
    const fromType = value.content.description;
    value.content.description = "";

    //Placeholders
    let exampleNodeList = [
        { id: 1, name: "Jeff", type: "person" },
        { id: 2, name: "Nick", type: "person" },
        { id: 3, name: "Pitt", type: "school" },
        { id: 4, name: "Penn State", type: "school" },
        { id: 5, name: "Temple", type: "school" },
        { id: 6, name: "Joshua", type: "person" },
        { id: 6, name: "Boy Scouts of America", type: "institution" },
        { id: 6, name: "Book Club", type: "institution" }
    ]
    let filteredNodes: Object[] = [];
    $: filteredNodes = exampleNodeList.filter(node => node.type === selectedType.val);

    //Finding a target
    let selectedType = {val: "", display: ""};
    let possibleTypes: Object[] = [
        {val: "person", display: "Person"},
        {val: "school", display: "School or University"},
        {val: "institution", display: "Non-School Institution"}
    ]
    if (fromType === "school")
    possibleTypes = possibleTypes.slice(0, 2);
    if (fromType === "institution") 
    possibleTypes = possibleTypes.slice(0, 1);

    let target = {id: 0, name: "", type: ""};
    const clearTargetField = () => {
        target = {id: 0, name: "", type: ""};
    }

    //available relationships
    let relType = "";
    let subType = "";
    let possRelationships: String[] = [""];
    $: if (fromType === "person" && target.type === "person") 
        possRelationships = ["Mentored", "Worked Alongside", "Was Mentored By"];
    else if (fromType === "person" && target.type === "school") 
        possRelationships = ["Studied At", "Worked At"]
    else if (fromType === "person" && target.type === "institution") 
        possRelationships = ["Served On", "Worked At"]
    else if (fromType === "person" && target.type === "institution") 
        possRelationships = ["Served On", "Worked At"]
    else if (fromType === "school" && target.type === "person") 
        possRelationships = ["Counts Among its Students", "Has Employed"]
    else if (fromType === "institution" && target.type === "person") 
        possRelationships = ["Has Employed"]
    

    let possSubtypes: String[] = [""];
    $: if (relType === "Mentored"  || relType === "Was Mentored By")
        possSubtypes = ["as dissertation chair", "as a non-chair member of the dissertation committee", "as a writing program administrator", "as a WAC/WID administrator", "as a Writing Project site administrator", "as a professor (graduate)", "as a professor (undergraduate)", "as a teacher (secondary school)", "as a consultant", "as a formal advisor of a type not indicated above"];
    else if (relType === "Studied At"  || relType === "Counts Among its Students")
        possSubtypes = ["toward a doctorate", "toward a master’s degree", "toward an undergraduate degree", "toward a secondary (high school) diploma", "in a non-degree or other program"];
    else if (relType === "Worked At"  || relType === "Has Employed")
        possSubtypes = ["as a graduate student instructor", "as a professor (adjunct)", "as a professor (undergraduate)", "as a professor (graduate)", "as an administrator", "as other staff"];
    else if (relType === "Worked Alongside")
        possSubtypes = ["as co-editors of a journal", "as co-editors of an anthology or collection", "as co-authors of an article", "as co-authors of a book", "as co-administrators of a writing program", "as co-administrators of a writing center", "as co-administrators of a WAC/WID program", "on the development of a digital project", "as formal collaborators of a type not indicated above"];
    else if (relType === "Served On")
        possSubtypes = ["as an editor", "as a founder", "as a committee chair", "as a committee member", "in a capacity not indicated above"];

    //Date range
    let ongoing: boolean = false;
    let endYear: number;
    
    //Object fields
        //id is predefined
        $: value.type = relType;
        $: value.subtype = subType;
        //link_from is predefined
        $: value.link_to = target.id;
        $: if (ongoing)
        {
            value.year_end = undefined;
            endYear = NaN;
        }
        else
        {
            value.year_end = endYear; 
        }
        value.content.citationList = [];


</script>

<div class = "inside minHeight">
    <h3>New relationship</h3>
    <div class="d-inline-flex p-2 flex-wrap align-items-center">
    <div class = "rightSpace">Create a relationship between my entry and a</div>
    <div class = "rightSpace"><AutoComplete 
        hideArrow={false} 
        items="{possibleTypes}"
        labelFieldName="display"
        valueFieldName="val"
        bind:selectedItem="{selectedType}" 
        inputClassName  = {"form-control form-control-sm"}
        onChange = {clearTargetField()}
        /></div>
      <div class = "rightSpace">named</div>
      <div> <AutoComplete 
        hideArrow={true} 
        labelFieldName="name"
        items="{filteredNodes}"
        bind:selectedItem="{target}" 
        itemFilterFunction={"type" === selectedType.val}
        inputClassName  = {"form-control form-control-sm"}
        /></div></div>
        <div class = "cushion"/>
        {#if target.name != ""}
        <div class="d-inline-flex flex-wrap p-2 align-items-center">
            <div class = "rightSpace">My entry</div>
            <div class = "rightSpace smallMinWidth"><select class="form-control" bind:value={relType}>
                {#each possRelationships as relationship}
                    <option value = {relationship}>
                        {relationship}
                    </option>
                {/each}
            </select></div>
            <div class = "rightSpace">{target.name}</div>
            <div class = "rightSpace largeMinWidth"><select class="form-control" bind:value={subType}>
                {#each possSubtypes as subtype}
                    <option value = {subtype}>
                        {subtype}
                    </option>
                {/each}
            </select></div>
        </div>
        <br/>
        <div class="d-inline-flex flex-wrap p-2 align-items-center">
            <div class = "rightSpace">From years</div>
            <div class = "rightSpace"><input type="number" class = "form-control numberWidth" bind:value={value.year_start}></div>
            <div class = "rightSpace">-</div>
            <div class = "rightSpace"><input type="number" class = "form-control numberWidth" bind:value={endYear} disabled={ongoing}></div>
            <div class = "rightSpace"> <input class="form-check-input" type="checkbox" id="ongoingCheckbox" bind:checked={ongoing}>
                <label class="form-check-label" for="ongoingCheckbox">This relationship is ongoing/in progress</label></div>
        </div>
        <hr/>
        <label for="additionalDescription">Additional description</label>
        <textarea class="form-control" bind:value = {value.content.description} id="additionalDescription" rows="3"></textarea>
        <hr/>
        <CitationAddButton bind:citationList = {value.content.citationList}/>
        {#each value.content.citationList as citation}
            <div>Citation Added - {citation.name}</div>
        {/each}
        {/if}
</div>

<style>
    .minHeight
    {
        min-height: 220px;
    }
    .smallMinWidth
    {
        min-width: 200px;
    }
    .largeMinWidth
    {
        min-width: 400px;
    }
    .rightSpace
    {
        margin-right: 5px;
    }
    .numberWidth
    {
        width: 90px;
    }
</style>