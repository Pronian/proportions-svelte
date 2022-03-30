<script lang="ts">
	import Proportions from './components/macroBlocks/Proportions.svelte';
	import Header from './components/macroBlocks/Header.svelte';
	import SidePanel from './components/common/SidePanel.svelte';
	import FocusPin from './components/common/FocusPin.svelte';
	import ColorSelector from './components/groups/ColorSelector.svelte';
	import NumberSelector from './components/common/NumberSelector.svelte';
	import { generateAppColors } from './util/colors';
	import { settingsStore } from './stores/settingsStore';
	import { uiState } from './stores/uiState';

	$: generateAppColors($settingsStore.theme);
</script>

<Header />
<main class="flex-cc">
	<Proportions roundingDigits={$settingsStore.roundingDigits} />
</main>

<SidePanel
	position="right"
	show={$uiState.areSettingsOpen}
	on:close={() => uiState.toggleSettings(false)}
>
	<h2>Settings</h2>
	<FocusPin />
	<ColorSelector bind:theme={$settingsStore.theme} />
	<NumberSelector label="Rounding digits" value={$settingsStore.roundingDigits} min={0} max={10}/>
</SidePanel>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}
</style>
