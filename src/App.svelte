<script lang="ts">
	import Proportions from './components/Proportions.svelte';
	import Header from './components/Header.svelte';
	import { generateAppColors } from './util/colors';
	import { settingsStore } from './stores/settingsStore';

	$: generateAppColors($settingsStore.theme);
</script>

<Header />
<main class="flex-cc">
	<Proportions roundingDigits={$settingsStore.roundingDigits}/>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}
</style>
