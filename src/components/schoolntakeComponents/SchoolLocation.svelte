<script lang="ts">
    export let location: string = "";
    //location fields
    let cityName = "";
    let stateAbbrev = "";
    let countryName = "";
    let inUSA = true;
    const stateAbbrevList = ['', 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];

    //Update value of location depending on fields selected by user
    $: if (inUSA)
        {
            location = ""+cityName+", "+stateAbbrev+", United States";
        }
        else
        {
            location = ""+cityName+", "+countryName;
        }
</script>

<div class="inside">
    <h2>2. Location</h2>
    <p>Where is your institution located?</p>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" bind:checked={inUSA} id="isInUSA">
        <label class="form-check-label" for="isInUSA">
          My institution is in the United States
        </label>
    </div>
    {#if inUSA}
    <div class="row">
        <div class="col largerWidth">
          <label for="inputCity">City<span class="red">*</span></label>
          <input type="text" bind:value={cityName} class="form-control" id="inputCity">
        </div>
        <div class="col">
          <label for="inputState">State<span class="red">*</span></label>
          <select id="inputState" class="form-control form-select" bind:value={stateAbbrev}>
            {#each stateAbbrevList as state}
                <option value={state}>
                    {state}
                </option>
            {/each}
          </select>
        </div>
        <div class="col">
          <label for="inputZip">Country</label>
          <input type="text" class="form-control" id="inputZip" value="United States" readonly disabled>
        </div>
    </div>
    {:else}
    <div class="row">
        <div class="col largerWidth">
          <label for="inputCity">City<span class="red">*</span></label>
          <input type="text" bind:value={cityName} class="form-control" id="inputCity">
        </div>
        <div class="col">
          <label for="inputZip">Country<span class="red">*</span></label>
          <input type="text" class="form-control" id="inputZip" bind:value={countryName}>
        </div>
    </div>
    {/if}
</div>

<style>
    .red
    {
      color: red;
    }
    .largerWidth
    {
        width:60%;
    }
</style>