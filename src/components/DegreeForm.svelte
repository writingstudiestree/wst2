<script>
    import { createEventDispatcher } from 'svelte'
 
    const institutionList = ["University of Pittsburgh", "University of Pennslyvania", "Pennslyvanie State University"];
    let degreeName;
    let institution;
    let level;
    let description;

    let dispatch = createEventDispatcher();
    const handleSubmit = () => {
        if (degreeName == undefined)
        {
            alert("You must enter an degree name to enter a degree");
        }
        else if (institution == undefined)
        {
            alert("You must enter an insitution name to enter a degree");
        }
        else{
        const degree = {
            degreeName,
            institution,
            level,
            description
        }
        degreeName = undefined;
        institution = undefined;
        description = undefined;
        dispatch('addDegree', degree)

    }
    };
</script>

<form on:submit|preventDefault = {handleSubmit} autocomplete="off"> 
<select bind:value = {level}>
    <option value = "Associate's degree">A.A. or A.S.</option>
    <option value = "Bachelor's degree">B.A. or B.S.</option>
    <option value = "Master's degree">M.A. or M.S.</option>
    <option value = "Ph.D. degree">Ph.D.</option>
    <option value = "Ph.D. degree">Minor</option>
    <option value = "certification">Certification</option>
    <option value = "other degree">Other</option>
</select>
<input type = "text" placeholder = "Degree name (ex. English)" bind:value = {degreeName}>
<input type = "text" placeholder = "Awarding insitution" bind:value = {institution}>
<input class = "increasedWidth" type = "text" placeholder = "Subtype or specialty (optional)" bind:value = {description}>
<button>Add degree</button>
</form>

<style>
    .increasedWidth{
        width: 250px;
    }
</style>