<script>
    
    import { createEventDispatcher } from 'svelte'
    import { validate_component } from 'svelte/internal';
    import DegreeForm from './DegreeForm.svelte';
    import PersonTags from './PersonTags.svelte';
    import ProfMemberships from './ProfMemberships.svelte';
    

    //Bundle object and send to main page
    let dispatch = createEventDispatcher();
    const handleSubmit = () => {
        if (validateSubmission())
        {
        console.log("Submission successful");
        const person = {
            id: "person" + Date.now() + "x" + Math.random(),
            type: "person",
            title,
            firstName,
            middleName,
            lastName,
            suffix,
            degrees,
            description,
            photo,
            website,
            ORCiD, 
            pronounce
        }
        dispatch('addPersonNode', person)
    }
    };

    const validateSubmission = () => {
        let valid = true;
        let errorMessage = "ERROR! The following fields are required: "
        if (title == "no value")
        {
            valid = false;
            errorMessage += "\n-Title"
        }
        if (firstName == "" || firstName == undefined)
        {
            valid = false;
            errorMessage += "\n-First Name"
        }
        if (lastName == "" || lastName == undefined)
        {
            valid = false;
            errorMessage += "\n-Last Name"
        }
        if (!valid)
        {
            alert(errorMessage);
        }
        return valid;
    };

    //Name section
    let title;
    let firstName;
    let middleName;
    let lastName;
    let suffix;
    let description;

    //Website
    let website;
    let ORCiD;
    let pronounce;

    //Degree Section
    let degrees = [];
    let intakeDegree = (e) => {
        console.log("degree added successfully");
        const newDegree = e.detail;
        degrees = [newDegree, ...degrees]; 
    }

    let removeDegree = () =>{
        degrees = degrees.slice(1);
    }

    //Image section
    let photo;

</script>

<div class = "inside">
    <h1 class = "formType">New Person</h1>
    <h2>1. Enter Information</h2>
    <p><span class = "red">*</span>Required fields</p>
<form>
    <p>Name Information<span class = "red">*</span></p>
    <select bind:value = {title}>
        <option value = "no value"></option>
        <option value = "Dr">Dr.</option>
        <option value = "Mr">Mr.</option>
        <option value = "Ms">Ms.</option>
        <option value = "Mx">Mx.</option>
    </select>
    <input type = "text" placeholder = "First Name" bind:value = {firstName} required>
    <input type = "text" placeholder = "Middle Name (if any)" bind:value = {middleName}>
    <input type = "text" placeholder = "Last Name" bind:value = {lastName} required>
    <select bind:value = {suffix}>
        <option value = "">--</option>
        <option value = "Jr">Jr.</option>
        <option value = "Sr">Sr.</option>
        <option value = "II">II</option>
        <option value = "III">III</option>
        <option value = "IV">IV</option>
        <option value = "V">V</option>
        <option value = "VI">VI</option>
        <option value = "VII">VII</option>
        <option value = "VIII">VIII</option>
        <option value = "IX">IX</option>
        <option value = "X">X</option>
    </select>
    <br/>
    <p>Website</p>
    <input type = "text" placeholder = "Please enter a url" bind:value = {website}>
    <p>ORCiD</p>
    <input type = "text" placeholder = "Please enter ORCiD" bind:value = {ORCiD}>
    <span class = "smallText">Learn more about ORCiD <a href = "https://orcid.org/">here</a></span>
    <p>Pronounciation Link</p>
    <input type = "text" placeholder = "Please enter a url" bind:value = {pronounce}>
    <span class = "smallText">Don't have one? Create one <a href = "https://kairos.technorhetoric.net/scholarnames/">here</a></span>
        <div>
            <p>Add Degrees and Qualifications</p>
        </div>
        <div>
            <DegreeForm on:addDegree = {intakeDegree}/>
        </div>
        <div>
            {#if degrees.length > 0}
                <button type = "button" on:click = {() => removeDegree()}>Undo degree entry</button>
            {/if}
            {#each degrees as degree}
                <ul>
                    <li>
                        {#if degree.level == "Associate's degree"}
                        An
                        {:else if degree.level == "other degree"}}
                        An
                        {:else}
                        A
                        {/if}
                        {degree.level} in {degree.degreeName} from {degree.institution}
                        {#if degree.description != undefined}
                            ({degree.description})
                        {/if}
                    </li>
                </ul>
            {/each}
        </div>

    <p>Assign Tags</p>
    <PersonTags/>
    <!--<p>Assign Institutions</p>
    <ProfMemberships/> -->
    <p>Image <span class = "smallText"> png, jpg</span></p>
<input accept="image/png, image/jpeg" type="file" bind:files={photo} />
    <div class = "flexcontainer">
    <p>Description</p>
    <textarea class = "fill" type = "text" placeholder = "Add additional description here" bind:value = {description}/>
    <span class = "smallText">You will be able to assign relationships in the next step!</span>
</div>

    <br/>
    <br/>
    <button on:click|preventDefault = {handleSubmit}>Next</button>
</form>
</div>


<style>
    /*div.degEntry{
        border-style: solid;
        background: #e2dede;
    }

    .flexContainer{
        display: flex;
    }*/

    .inside {
    width: 80%;
    border: 2px solid black;
    height: auto;
    padding: 2%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    background-color: white;
    opacity: 0.92;
    }

    /*div.lineItem {
        margin-top: 3px;
        border-width: 1px;
        height: 20px;
        padding: 2px;
    }*/

    .fill {
        overflow-y:auto;
        height: 80px;
        width: 100%;
    }
    .formType
    {
        text-align: center;
    }
    .red{
        color: red;
    }

    .smallText
    {
        font-size: x-small;
    }

</style>