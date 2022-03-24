<script lang="ts">
	import { onMount } from 'svelte';
	let div: HTMLDivElement;

	onMount(() => {
		div.focus();
	});
</script>

<div bind:this={div} tabindex="-1" aria-hidden="true" />

<style>
	div {
		opacity: 0;
		position: absolute;
		top: -9999px;
		left: -9999px;
	}
</style>
