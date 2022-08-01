<script>

    //degrees exported as a list of relation nodes
    export let relationNodes = []; 

    //information for one degree
    let level;
    let department;
    let awardingInst;
    let concentration;
    let startYear;
    let endYear;

    //imported target
    export let personID = undefined;

    //adding nodes the the array
    const packageNode = () =>
    {
        let description;
        if ((concentration != "" && concentration != undefined) && (department != "" && department != undefined))
        {
            description = level + " awarded from " + department + " (" + concentration + ")";
        }
        else if ((concentration != "" && concentration != undefined) && (department == "" || department == undefined))
        {
            description = level + " (" + concentration + ")";
        }
        else if ((concentration == "" || concentration == undefined) && (department == "" || department == undefined))
        {
            description = level + " awarded from " + department;
        }
        else
        {
            description = "" + level;
        }
        let studiedAtNode = {
            id: "relation" + Date.now() + "x" + Math.random(),
            type: "Studied at",
            subtype: level,
            linkFrom: personID,
            linkTo: awardingInst,
            startYear,
            endYear,
            description,
            citations: []
        };
        relationNodes = [studiedAtNode, ...relationNodes]
        resetFields();
    };

    const resetFields = () => 
    {
        department = "";
        awardingInst = "";
        concentration = "";
        startYear = "";
        endYear = "";
    };

    //removing degrees
    let removeDegree = () =>{
        relationNodes = relationNodes.slice(1);
    }

</script>
<div class = "inside">
    <h2>3. Degrees</h2>
    <p>Where did this person receive their education?</p>
    <div class = "indented">
        {#if relationNodes.length > 0}
            <div class = "inside">
                    <h3>Preview box</h3>
                    {#each relationNodes as degree}
                        <ul>
                            <li>
                                {#if degree.level == "Associate's degree" || degree.level == "educational program"}
                                    An
                                {:else}
                                    A
                                {/if}
                                 {degree.description} from {degree.linkTo}, {degree.startYear}-{degree.endYear}
                            </li>
                        </ul>
                    {/each}
                    <button type = "button" on:click = {() => removeDegree()}>Undo degree entry</button>
            </div>
        {/if}
        <select bind:value = {level}>
            <option value = "Associate's degree">A.A. or A.S.</option>
            <option value = "Bachelor's degree">B.A. or B.S.</option>
            <option value = "Master's degree">M.A. or M.S.</option>
            <option value = "Ph.D. degree">Ph.D.</option>
            <option value = "GED/High School Diploma">GED/High School Diploma</option>
            <option value = "educational program">Other</option>
        </select>
        <input type = "text" placeholder = "Department or Program" bind:value = {department}>
        <input type = "text" placeholder = "Awarding insitution" bind:value = {awardingInst}>
        <input class = "increasedWidth" type = "text" placeholder = "Concentration or Track (optional)" bind:value = {concentration}>
        <br/>
        <input class = "short" type = "text" placeholder = "Start Year" bind:value = {startYear}>
        <input class = "short" type = "text" placeholder = "End Year" bind:value = {endYear}>
        <br/>
        <br/>
        <button on:click = {packageNode}>Add degree</button>
    </div>
</div>
<style>
    .increasedWidth
    {
        width: 250px;
    }

    .indented
    {
        padding-left: 20px;
        padding-right: 20px;
    }

    .short
    {
        width: 60px;
    }

    .inside 
    {
        
        width: 90%;
        border: 2px solid black;
        height: auto;
        padding: 2%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
        background-color: white;
        opacity: 0.92;
    }
</style>