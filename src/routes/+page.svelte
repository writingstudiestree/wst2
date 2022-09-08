<script lang="ts">
	import type { PageData } from "./$types";
	export let data: PageData;
	$: ({ user } = data);
</script>

<div class="card mb-5">
    <div class="card-body">
		<h1 class="card-title centerHeader">Welcome to The Writing Studies Tree!</h1>
		<p class="card-subtitle text-muted mb-3">
        <p>The WST is an online, crowdsourced database of academic genealogies within writing studies; in other words, it is an interactive archive for recording and mapping scholarly relationships in Composition and Rhetoric and adjacent disciplines.</p>
				{#if !user}
        <p class = "xl"><a href="/#signin">Create an account to get started</a></p>
				{/if}
    </div>
    <div class = "banner"></div>
    <div class="card-body">
        <h2>Have an account but not sure where to start?</h2>
        <br/>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
              <div class="card cardHeight">
                <div class = "colorDiv"></div>
                <div class="card-body">
                  <h5 class="card-title">Add an entry</h5>
                  <p class="card-text">WST relies on users like you to crowdsource its content and grow its network. If you have a person, school, institution, or citation to contribute, <a href = "/forms">please click here!</a></p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card cardHeight">
                <div class = "colorDiv2"></div>
                <div class="card-body">
                  <h5 class="card-title">Explore our tree</h5>
                  <p class="card-text">Want to check out what we have? To view our current network, <a href = "/explore/">please click here!</a></p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card cardHeight">
                <div class = "colorDiv3"></div>
                <div class="card-body">
                  <h5 class="card-title">About us</h5>
                  <p class="card-text">Learn more about WST's mission and team <a href = "/">here!</a></p>
                </div>
              </div>
            </div>
          </div>
    </div>
</div>

<style>
    .banner
    {
        padding-left: 0;
        padding-right: 0;
        width: 100%;
        background-image: url("../images/booktree.png");
        height: 120px;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }

    .colorDiv
    {
        height: 5px;
        background-color: blue;
    }

    .colorDiv2
    {
        height: 5px;
        background-color: red;
    }

    .colorDiv3
    {
        height: 5px;
        background-color: green;
    }

    .centerHeader
    {
        text-align: center;
        text-size-adjust: 160%;
    }

    .cardHeight
    {
        min-height: 200px;
    }

    .xl
    {
      font-size: x-large;
    }
</style>