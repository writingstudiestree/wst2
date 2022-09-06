<script lang="ts">
	import { goto } from "$app/navigation";
	import type { SearchResult } from "src/api/search";
	import { contentIcons } from "src/utils/forms";
	import { onDestroy } from "svelte";

	export let result: SearchResult;
	export let onClick: ((result: SearchResult) => void) | null = null;

	$: url = `/content/${result.content.id}`;
	$: name = result.content.name?.split("|")[0];
	$: nameExtra = result.content.name?.split("|").slice(1);
	$: description = (result.content.content as any)?.description;

	$: tooltipText = result.content.type.charAt(0).toUpperCase() + result.content.type.slice(1);
	let tooltipElement: any;
	let tooltip: any;

	$: if (tooltipElement && !tooltip) {
		tooltip = new (globalThis as any).bootstrap.Tooltip(tooltipElement);
	}

	onDestroy(() => {
		if (tooltip) tooltip.dispose();
	});

	function handleClick() {
		onClick ? onClick(result) : goto(url);
	}
</script>

<div class="card mb-3" on:click={handleClick}>
	<div class="card-body">
		<div class="card-title d-flex align-items-center">
			<i
				class="material-icons text-secondary pe-2"
				data-bs-toggle="tooltip"
				data-bs-title={tooltipText}
				bind:this={tooltipElement}
			>
				{contentIcons[result.content.type]}
			</i>
			<a href={url} on:click|preventDefault={handleClick}>
				<h2 class="h5 m-0 d-inline me-3">{name}</h2>
			</a>
			<h3 class="h5 m-0 text-secondary me-3 d-none d-sm-inline">{nameExtra.join(", ")}</h3>

			<p class="text-secondary m-0 d-none d-lg-inline">
				{description || ""}
			</p>
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

	.card-body h3, .card-body p {
		overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
	}
</style>
