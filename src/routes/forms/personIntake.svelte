<script>
import Heading from "../components/header.svelte";

//Handling which form is currently loaded
import { goto } from "$app/navigation";
import BasicInformation from "../components/personIntakeComponents/BasicInformation.svelte";
import Tags from "../components/personIntakeComponents/Tags.svelte";
// @ts-ignore
import Degrees from "../components/personIntakeComponents/Degrees.svelte";
let step = 1;
const next = () =>
{
    step++;
}
const prev = () =>
{
    step--;
    if (step <= 0)
    {
        goto("/");
    }
}

const bug = () =>
{
    console.log(id + " " + type + " " + name + ORCiD +" "+ tags);
}

//Fields filled as the forms progress

    //id and type are fixed when the first form is accessed
    export const id =  "person" + Date.now() + "x" + Math.random();
    const type = "person";

    //these fields are filled upon completion of form one
    let name;
    let ORCiD;
    let pronounceLink;

    //these fields are filled upon completion of form one
    let tags;


//Relation nodes
let relationNodes; 

//The node that is built upon submit
let person = 
{
    //id and type are fixed when the first form is accessed
    id,
    type,

    //these fields are filled upon submission of form one
    name,
    ORCiD,
    pronounceLink

}
    
</script>
<body>
    <Heading/>
        <div class = "inside">
            <div>
            {#if step == 1}
                <BasicInformation bind:name={name} bind:ORCiD={ORCiD} bind:pronounceLink={pronounceLink}/>
            {:else if step == 2}
                <Tags bind:enteredTags = {tags}/>
            {:else if step == 3}
                <Degrees bind:relationNodes = {relationNodes} personID = {id}/>
            {/if}
            <br/>
            <br/>
            <button on:click = {prev}>Previous</button>
            <button class = "next" on:click = {next}>Next</button>
        </div>
        <button on:click = {bug}>debug</button>
    </div>
</body>
<style>
    .inside 
    {
        
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

    .next
    {
        color: white;
        background-color: blue;
        border-radius: 2px;
    }

    .next:hover
    {
        background-color: darkblue;
    }

    body
    {
        background-image: url(../images/background2.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        margin: 0;
        padding: 0;
        font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
</style>