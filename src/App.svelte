<script lang="ts">
	import Proportions from './components/Proportions.svelte';
	import Header from './components/Header.svelte';
	import { generateAlphaColors } from './util/colors';
	import { settingsStore } from './stores/settingsStore';
	import { onMount } from 'svelte';
	let previousTheme: 'dark' | 'light' | undefined;

	onMount(() => {
		generateAlphaColors(['--bg-color', '--text-color', '--primary-color', '--secondary-color']);
	});

	$: {
		if (previousTheme) {
			document.body.classList.remove(previousTheme);
		}
		document.body.classList.add($settingsStore.theme);
		previousTheme = $settingsStore.theme;
	}
</script>

<Header />
<main class="flex-cc">
	<Proportions />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}
</style>
