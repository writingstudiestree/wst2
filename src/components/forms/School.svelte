<script lang="ts">
	import type { Content } from '../../api/types';

	export let value: Content & {
		content: {
			tags: string[],
			websites: string[],
			description: string,
		}
	};
</script>