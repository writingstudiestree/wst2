<script lang="ts">
	export let isLoggedIn = true;

	let format = "gephi";
	$: exportContentUrl = `/api/export/csv?table=content&format=${format}`;
	$: exportRelationsUrl = `/api/export/csv?table=relations&format=${format}`;
</script>

<div class="card card-body mb-3">
	<h1>Export</h1>
	{#if isLoggedIn}
	<p>
		This export provides a dataset of all WST entries which can be used for local analysis. Node and edge data can be exported in CSV formats optimized for <a href="https://github.com/gephi/gephi/wiki/Import-CSV-Data">Gephi</a> or <a href="https://docs.kumu.io/guides/import.html">Kumu</a>.
	</p>

	<label for="exportFormat">Export Format</label>
	<select id="exportFormat" class="form-select mb-3" bind:value={format}>
		<option value="gephi" selected>Gephi</option>
		<option value="kumu">Kumu</option>
	</select>

	<div>
		<a class="btn btn-primary d-inline-flex align-items-center" href={exportContentUrl}>
			<i class="material-icons me-2">download</i>
			nodes.csv
		</a>
		<a class="btn btn-primary d-inline-flex align-items-center" href={exportRelationsUrl}>
			<i class="material-icons me-2">download</i>
			edges.csv
		</a>
	</div>
	{:else}
	<p>Please <a href="#signin">log in</a> to export data from the site.</p>
	{/if}
</div>
