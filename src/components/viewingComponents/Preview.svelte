<script type="ts">
    import type { Content } from 'src/api';
    export let value: Content & {
    content: any,
	};

	let extraNames: string = "";
	for (let i = 1; i < value.content.tempNames.length; i++) {
		if (value.content.tempNames[i] !== "" && i === 1)
		extraNames += value.content.tempNames[i];
		if (value.content.tempNames[i] !== "" && i != 1)
		extraNames += ", " + value.content.tempNames[i];
	}

;</script>
<h1 class = "textCenter">Form relationships</h1>
			<div class = "inside">
				<h2>Getting Ready</h2>
				<p>Now that your node has been created, it is time to start forming relationships within the network! First, let's take a look at your current entry:</p>
				<div class = "inception">
					<h2>New {value.type} - {value.content.tempNames[0]}</h2>
					{#if value.content.tempNames.length > 1}
					<span>Also known as: {extraNames}</span>
					{/if}
					<ul class="list-group">
						{#if value.type === "person"}
						<li class="list-group-item">ORCiD: {value.content.orcId}</li>
						{/if}
					</ul>

					
				</div>
				<p>See any errors? Use the 'back' button at the top of the page to correct them before we start integrating your node in to the network!</p>
			</div>