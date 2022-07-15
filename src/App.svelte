<script lang="ts">
	import Proportions from './components/macroBlocks/Proportions.svelte';
	import Header from './components/macroBlocks/Header.svelte';
	import SidePanel from './components/common/SidePanel.svelte';
	import FocusPin from './components/common/FocusPin.svelte';
	import ColorSelector from './components/groups/ColorSelector.svelte';
	import NumberSelector from './components/common/NumberSelector.svelte';
	import InfoFooter from './components/groups/InfoFooter.svelte';
	import LeftPanel from './components/macroBlocks/LeftPanel.svelte';
	import { generateAppColors } from './util/colors';
	import { settingsStore } from './stores/settingsStore';
	import { uiState } from './stores/uiState';

	$: generateAppColors($settingsStore.theme, $settingsStore.customThemeColors);

	function handleCustomThemeChanged(event: CustomEvent<string[]>) {
		const colors = event.detail;

		$settingsStore.customThemeColors['bg-color'] = colors[0];
		$settingsStore.customThemeColors['primary-color'] = colors[1];
		$settingsStore.customThemeColors['secondary-color'] = colors[2];
		$settingsStore.customThemeColors['text-color'] = colors[3];
	}
</script>

<Header />
<main class="flex-cc">
	<LeftPanel />
	<div class="flex-cc prop-cont">
		<Proportions roundingDigits={$settingsStore.roundingDigits} />
	</div>
</main>

<SidePanel
	class="settings"
	position="right"
	show={$uiState.areSettingsOpen}
	on:close={() => uiState.toggleSettings(false)}
>
	<h2>Settings</h2>
	<FocusPin />
	<ColorSelector
		bind:theme={$settingsStore.theme}
		customColors={Object.values($settingsStore.customThemeColors)}
		on:customThemeChanged={handleCustomThemeChanged}
	/>
	<NumberSelector
		label="Rounding digits"
		bind:value={$settingsStore.roundingDigits}
		min={0}
		max={10}
	/>
	<div />
	<InfoFooter />
</SidePanel>

<style>
	@import './global.css';

	main {
		align-items: stretch;
	}

	.prop-cont {
		justify-content: flex-start;
		text-align: center;
		margin: 0 auto;
		flex-direction: column;
	}

	@media (min-width: 768px) {
		.prop-cont {
			margin-top: 3rem;
		}
	}

	:global(.settings) {
		min-height: 100vh;
	}

	:global(.settings > :nth-last-child(2)) {
		flex-grow: 1;
	}
</style>
