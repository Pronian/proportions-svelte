<script lang="ts">
	import SidePanel from '../common/SidePanel.svelte';
	import ColorSelector from '../groups/ColorSelector.svelte';
	import NumberSelector from '../common/NumberSelector.svelte';
	import InfoFooter from '../groups/InfoFooter.svelte';
	import FocusPin from '../common/FocusPin.svelte';
	import { settingsStore } from '../../stores/settingsStore';
	import { uiState } from '../../stores/uiState';
</script>

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
		on:customThemeChanged
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
	:global(.settings) {
		min-height: 100vh;
	}

	:global(.settings > :nth-last-child(2)) {
		flex-grow: 1;
	}
</style>
