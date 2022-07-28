<script>
    import SchoolTag from './SchoolTag.svelte';
    import { createEventDispatcher } from 'svelte'

    let instName;
    let website;
    //location data
        let cityName;
        let countryName;
        let stateName = '';
        const stateAbbrev = ['', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
    let inAmerica = true;
    let photo;
    let description;

    let dispatch = createEventDispatcher();
    const handleSubmit = () => {
        if (validateSubmission())
        {
        console.log("Submission successful");
        const school = {
            id: "school" + Date.now() + "x" + Math.random(),
            type: "school",
            instName,
            website,
            location: buildLocation(),
            photo,
            description
        }
        dispatch('addSchoolNode', school)
    }
    };
    
    const buildLocation = () => {
        if (inAmerica)
            {
                return cityName + ", " + stateName;
            }
            else
            {
                return cityName + ", " + countryName;
            }
    };

    const validateSubmission = () => {
        let valid = true;
        let errorMessage = "ERROR! The following fields are required: "
        if (instName == "" || instName == undefined)
        {
            valid = false;
            errorMessage += "\n-Institution Name"
        }
        if (cityName == "" || cityName == undefined)
        {
            valid = false;
            errorMessage += "\n-City"
        }
        if (stateName == "" && (countryName == undefined || countryName == ""))
        {
            valid = false;
            errorMessage += "\n-State or Country"
        }
        if (!valid)
        {
            alert(errorMessage);
        }
        return valid;
    };

</script>
<div class = "inside">
    <h1 class = "formType">New School or Academic Insitution</h1>
    <h2>1. Enter Information</h2>
    <p><span class = "red">*</span>Required fields</p>
<form>
    <p>Name<span class = "red">*</span></p>
    <input type = "text" placeholder = "Institution Name" bind:value = {instName} required>
    
    <p>Location<span class = "red">*</span></p>
    <label>
    <input type="checkbox" bind:checked={inAmerica}/>
    My institution is in the United States
</label>
<br/>
<br/>
    {#if inAmerica}
    <input type = "text" placeholder = "City (ex. New York)" bind:value = {cityName} required>
        <select bind:value = {stateName}>
            {#each stateAbbrev as state}
                <option value={state}>
                    {state}
                </option>
            {/each}
        </select>
    {:else}
    <input type = "text" placeholder = "City (ex. London)" bind:value = {cityName} required>
    <input type = "text" placeholder = "Country" bind:value = {countryName} required>
    {/if}
    <p>Website</p>
    <input type = "text" placeholder = "Please enter a url" bind:value = {website}>
    <p>Add tags</p>
    <SchoolTag/>
    <p>Image</p>
<input accept="image/png, image/jpeg" type="file" bind:files={photo} />
<p>Description</p>
    <textarea class = "fill" type = "text" placeholder = "Add additional description here" bind:value = {description}/>
    <br/>
    <br/>
    <button on:click|preventDefault = {handleSubmit}>Next</button>
</form>
</div>

<style>
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
    .red{
        color: red;
    }
    .fill {
        overflow-y:auto;
        height: 80px;
        width: 100%;
    }
    .formType
    {
        text-align: center;
    }
    </style>