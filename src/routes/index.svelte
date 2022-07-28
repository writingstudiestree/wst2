<script>
    import Heading from "../components/header.svelte";

    //Importing possible forms
    import UnselectedForm from "../components/UnselectedForm.svelte";
    import PersonForm from "../components/PersonForm.svelte"
    import NewSchoolForm from "../components/NewSchoolForm.svelte";
    import InsitutionForm from "../components/InstitutionForm.svelte";
    import SourceMaterialForm from "../components/SourceMaterialForm.svelte";
    import RelationMaker from "../components/RelationMaker.svelte";

    //Storage for all possible content nodes
    let peopleNodes = [];
    let schoolNodes = [];
    let institutionNodes = [];
    let sourceMaterialNodes = [];
    let relationNodes = [];
    let newEntry;

    //Intake node depending on form submitted
    let typeOfForm;
    let successfullyAdded = false;
    let intakePerson = (e) => {
        const person = e.detail;
        peopleNodes = [person, ...peopleNodes];
        successfullyAdded = true; 
        newEntry = person.firstName + " " + person.lastName;
    }
    let intakeSchool = (e) => {
        const school = e.detail;
        schoolNodes = [school, ...schoolNodes];
        successfullyAdded = true;  
        newEntry = school.instName;
    }
    let intakeInstitution = (e) => {
        const insitution = e.detail;
        institutionNodes = [insitution, ...institutionNodes]; 
        successfullyAdded = true; 
        newEntry = insitution.instName;
    }
    let intakeSourceMaterial = (e) => {
        const sourceMaterial = e.detail;
        sourceMaterialNodes = [sourceMaterial, ...sourceMaterialNodes]; 
        successfullyAdded = true; 
        newEntry = "your citation";
    }
</script>
<body>
<Heading/>
{#if !successfullyAdded}
<div class = "inside">
    <h2>Select the entry type here to get started.</h2>
    I want to enter a:
    <select bind:value = {typeOfForm}>
        <option value = "unselected">--</option>
        <option value = "Person">New Person</option>
        <option value = "School or Academic Insitution">New School or Academic Insitution</option>
        <option value = "Non-School Insitution">New Non-School Insitution (such as a journal or committee)</option>
        <option value = "Source Material / Citation">New Source Material / Citation</option>
    </select>
</div>

<!-- Present form and intake type based on form asked for -->
{#if typeOfForm == "Person"}
<PersonForm on:addPersonNode = {intakePerson}/>
{/if}
{#if typeOfForm == "School or Academic Insitution"}
<NewSchoolForm on:addSchoolNode = {intakeSchool}/>
{/if}
{#if typeOfForm == "unselected"}
<UnselectedForm/>
{/if}
{#if typeOfForm == "Non-School Insitution"}
<InsitutionForm on:addInstitutionNode = {intakeInstitution}/>
{/if}
{#if typeOfForm == "Source Material / Citation"}
<SourceMaterialForm on:addSourceMaterial = {intakeSourceMaterial}/>
{/if}
{:else}
    <RelationMaker newEntry = {newEntry} typeOfForm = {typeOfForm.toString()}/>
{/if}
</body>
<style>
    .inside {
    width: 84%;
    height: auto;
    padding: 2%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0px;
    }
    body {
    margin: 0;
    padding: 0;
}
body{
    background-image: url(../images/background2.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
