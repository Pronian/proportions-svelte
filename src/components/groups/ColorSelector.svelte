<script lang="ts">
	import ColorBlock from '../common/ColorBlock.svelte';
	import { type ColorTheme, lightThemeColors, darkThemeColors } from '../../util/colors';

	export let theme: ColorTheme;
</script>

<div>
	<ColorBlock
		class="btn-theme"
		colors={Object.values(lightThemeColors)}
		label="Light theme"
		value="light"
		bind:group={theme}
	/>
	<ColorBlock
		class="btn-theme"
		colors={Object.values(darkThemeColors)}
		label="Dark theme"
		value="dark"
		bind:group={theme}
	/>
</div>

<style>
	div {
		width: 100%;
		display: flex;
		padding: 1.5rem;
		gap: 1.5rem;
	}

	div :global(.btn-theme) {
		flex: 1;
	}
</style>
