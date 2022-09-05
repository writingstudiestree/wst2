<script lang="ts">
	import { goto } from "$app/navigation";
	import type { SearchResult } from "src/api/search";
	import { onMount } from "svelte";

	export let result: SearchResult;

	$: url = `/content/${result.content.id}`;
	$: name = result.content.name?.split("|")[0];
	$: nameExtra = result.content.name?.split("|").slice(1);

	$: icon = ({
		person: "person",
		school: "school",
		institution: "domain",
	})[result.content.type];

	$: tooltipText = result.content.type.charAt(0).toUpperCase() + result.content.type.slice(1);
	let tooltipElement: any;

	$: if (tooltipElement) {
		new (globalThis as any).bootstrap.Tooltip(tooltipElement);
	}
</script>

<div class="card mb-3" on:click={() => goto(url)}>
	<div class="card-body">
		<div class="card-title d-flex align-items-center">
			<i
				class="material-icons text-secondary pe-2"
				data-bs-toggle="tooltip"
				data-bs-title={tooltipText}
				bind:this={tooltipElement}
			>
				{icon}
			</i>
			<a href={url}>
				<h2 class="h5 m-0">{name}</h2>
			</a>
		</div>
	</div>
	<div class="card-footer">
		<small>Last updated on <time datetime={new Date(result.content.date_modified).toISOString()}>{new Date(result.content.date_modified)}</time>.</small>
	</div>
</div>

<style>
	.card {
		cursor: pointer;
	}
</style>
