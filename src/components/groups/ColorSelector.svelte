<script lang="ts">
	import ColorBlock from '../common/ColorBlock.svelte';
	import { type ColorTheme, lightThemeColors, darkThemeColors } from '../../util/colors';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function customThemeChanged(colors: string[]) {
		dispatch('customThemeChanged', colors);
	}

	export let theme: ColorTheme;
	export let customColors: string[];
</script>

<div class="cont">
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
	<ColorBlock
		class="btn-theme"
		colors={Object.values(customColors)}
		label="Custom theme"
		value="custom"
		bind:group={theme}
	/>
	{#if theme === 'custom'}
		<div class="customize-cont">
			Select custom theme colors:
			{#each customColors as color}
				<input type="color" bind:value={color} />
			{/each}
		</div>
		<button on:click={() => customThemeChanged(customColors)}>Apply</button>
	{/if}
</div>

<style>
	.cont {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 1.5rem;
		gap: 1.5rem;
	}

	.cont :global(.btn-theme) {
		width: calc(50% - 1.5rem / 2);
	}

	.customize-cont {
		width: 100%;
	}
</style>
