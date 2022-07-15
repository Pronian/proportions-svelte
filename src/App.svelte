<script lang="ts">
	import Proportions from './components/macroBlocks/Proportions.svelte';
	import Header from './components/macroBlocks/Header.svelte';
	import SettingsPanel from './components/macroBlocks/SettingsPanel.svelte';
	import LeftPanel from './components/macroBlocks/LeftPanel.svelte';
	import { generateAppColors } from './util/colors';
	import { settingsStore } from './stores/settingsStore';

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

<SettingsPanel on:customThemeChanged={handleCustomThemeChanged} />

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
</style>
