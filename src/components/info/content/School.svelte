<script lang="ts">
	import type { Content } from "src/api/types";

	export let content: Content;
	$: names = content.name.split(",");
	$: json = content.content as any;
</script>

<div class="mb-5">
	<h1>{names[0]}</h1>

	{#if names.length > 1}
	<small>
		<h2 class="h6">Also known as:</h2>
		<ul>
			{#each names.slice(1) as name}
			<li>{name}</li>
			{/each}
		</ul>
	</small>
	{/if}

	{#if json.location}
	<div class="d-flex text-secondary">
		<i class="material-icons me-2">place</i>
		{json.location}
	</div>
	{/if}
</div>

<div class="row">
	<div class="col col-12 col-lg-8">
		{#if json.description}
		<h2 class="h5">Description</h2>
		<p>{json.description}</p>
		{/if}

		{#if json.tags && json.tags.length > 0}
		<div class="mb-3">
			{#each json.tags as tag}
			<span class="badge rounded-pill bg-secondary me-2">{tag}</span>
			{/each}
		</div>
		{/if}
	</div>
	<div class="col col-12 col-lg-4">
		{#if json.websites && json.websites.length > 0}
		<h2 class="h5">Websites</h2>
		<ul>
			{#each json.websites as website}
			<li><a href={website} rel="external nofollow">{website}</a></li>
			{/each}
		</ul>
		{/if}
	</div>
</div>
