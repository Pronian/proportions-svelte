<script lang="ts">
	import Proportions from './components/Proportions.svelte';
	import Header from './components/Header.svelte';
	import SidePanel from './components/SidePanel.svelte';
	import { generateAppColors } from './util/colors';
	import { settingsStore } from './stores/settingsStore';
	import { uiState } from './stores/uiState';

	$: generateAppColors($settingsStore.theme);
</script>

<Header />
<main class="flex-cc">
	<Proportions roundingDigits={$settingsStore.roundingDigits} />
</main>

<SidePanel position="right" show={$uiState.areSettingsOpen} on:close={() => uiState.toggleSettings(false)}>
	Settings
</SidePanel>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}
</style>
