<script lang="ts">
	import { clickOutside } from '../actions/clickOutside';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

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

	$: width = Math.min(innerWidth, maxWidth);
</script>

<svelte:window bind:innerWidth />

{#if show}
	<div class="backdrop" transition:fade role="presentation" />

	<div
		role="dialog"
		style="{position}: 0; width:{width}px;"
		use:clickOutside
		on:clickOutside={handleOutsideClick}
	>
		<slot />
	</div>
{/if}

<style>
	.backdrop {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--bg-color-alpha-50);
	}

	[role='dialog'] {
		position: absolute;
		top: 0;
		bottom: 0;
		background-color: var(--bg-color-highlight-30);
		box-shadow: var(--shadow-color) 0 0 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
