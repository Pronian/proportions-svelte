<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import IconButton from './IconButton.svelte';
	import SvgBuilder from './SvgBuilder.svelte';
	import { cross } from '../../assets/svgObjects';
	import { sideSlide } from '../../transitions/slide';
	import { clickOutside } from '../../actions/clickOutside';
	import { inertSiblings } from '../../actions/inert';
	import { stylesDuringTransition } from '../../actions/duringTransition';

	let className = '';
	export { className as class };
	export let show = false;
	export let closeOnOutsideClick = true;
	export let position: 'left' | 'right' = 'left';
	export let maxWidth = 500;

	let innerWidth: number;

	const dispatch = createEventDispatcher();

	function handleOutsideClick() {
		if (closeOnOutsideClick) {
			show = false;
			dispatch('close');
		}
	}

	function handleCloseClick() {
		show = false;
		dispatch('close');
	}

	$: width = Math.min(innerWidth, maxWidth);
</script>

<svelte:window bind:innerWidth />

{#if show}
	<div class="backdrop" transition:fade role="presentation" />

	<div
		class={className}
		role="dialog"
		style="{position}: 0; width:{width}px;"
		transition:sideSlide={{ side: position }}
		use:inertSiblings={show}
		use:stylesDuringTransition={{ element: document.body, styles: { 'overflow-x': 'hidden' } }}
		use:clickOutside
		on:clickOutside={handleOutsideClick}
	>
		<IconButton class="close" on:click={handleCloseClick}>
			<SvgBuilder svgObj={cross} role="img" title="Close panel" />
		</IconButton>
		<slot />
	</div>
{/if}

<style>
	.backdrop {
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--bg-color-alpha-50);
		backdrop-filter: blur(2px);
	}

	[role='dialog'] {
		position: absolute;
		z-index: 2;
		top: 0;
		bottom: 0;
		background-color: var(--bg-color-highlight-30);
		box-shadow: var(--shadow-color) 0 0 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	[role='dialog'] :global(.close) {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 3rem;
	}
</style>
