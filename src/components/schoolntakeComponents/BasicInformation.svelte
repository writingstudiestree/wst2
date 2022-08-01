<script lang="ts">
    export let name: string = "";
    export let location: string = "";

    //location fields
    let cityName = "";
    let stateAbbrev = "";
    let countryName = "";
    let USA = true;
    const stateAbbrevList = ['', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

    //Update value of location depending on fields selected by user
    $: if (stateAbbrev === "")
        {
            location = ""+cityName+", "+countryName;
        }
        else
        {
            location = ""+cityName+", "+stateAbbrev+", United States";
        }
</script>

<div class="inside">
    <h1 class="formType">New School or University</h1>
    <h2>1. Basic Informtion</h2>
    <p>Enter some basic information about the school being added</p>
    <p><span class="red">*</span>Required fields</p>
    <form>
        <label>
            <input type=checkbox checked={USA}>
            My institution is in the United States
        </label>
        {#if USA}
        <input type = "text" placeholder = "City (ex. New York)" bind:value = {cityName} required>
            <select bind:value = {stateAbbrev}>
                {#each stateAbbrevList as state}
                    <option value={state}>
                        {state}
                    </option>
                {/each}
            </select>
        {:else}
        <input type = "text" placeholder = "City (ex. London)" bind:value = {cityName} required>
        <input type = "text" placeholder = "Country" bind:value = {countryName} required>
        {/if}
    </form>
</div>

<style>
    .red
    {
        color: red;
    }

    .smallText
    {
        font-size: x-small;
    }

    input
    {
        width: 20%;
    }

    .indented
    {
        padding-left: 20px;
        padding-right: 20px;
    }
</style>