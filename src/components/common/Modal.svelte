<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import IconButton from './IconButton.svelte';
	import SvgBuilder from './SvgBuilder.svelte';
	import { cross } from '../../assets/svgObjects';
	import { clickOutside } from '../../actions/clickOutside';
	import { inertSiblings } from '../../actions/inert';
	import { bodyScrollLock } from '../../actions/bodyScrollLock';

	let dialog: HTMLDialogElement;

	onMount(() => {
		dialog.showModal();

		return () => dialog.close();
	});

	const dispatch = createEventDispatcher();

	export let closeOnOutsideClick = true;

	function handleOutsideClick() {
		if (closeOnOutsideClick) {
			dispatch('close');
		}
	}
</script>

<div class="backdrop" transition:fade />
<dialog
	bind:this={dialog}
	use:inertSiblings={true}
	use:bodyScrollLock={true}
	use:clickOutside
	on:clickOutside={handleOutsideClick}
	transition:scale
>
	<IconButton class="close" on:click={() => dispatch('close')}>
		<SvgBuilder svgObj={cross} role="img" title="Close panel" />
	</IconButton>
	<slot />
</dialog>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--bg-color-alpha-50);
		backdrop-filter: blur(2px);
	}

	dialog {
		display: flex;
		padding: 3rem 2rem;
		flex-direction: column;
		align-items: center;
		border-radius: 0.8rem;
		border: none;
		min-width: 32rem;
		min-height: 20rem;
		max-height: 80vh;
		transform: translateY(-2rem);
		color: var(--text-color);
		background-color: var(--bg-color-highlight-30);
		box-shadow: var(--shadow-color) 0 0 2rem;
	}

	dialog::backdrop {
		/* Easier to handle animations with custom backdrop */
		opacity: 0;
	}

	dialog :global(.close) {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 3rem;
	}
</style>
