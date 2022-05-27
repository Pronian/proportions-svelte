<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
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

<dialog
	bind:this={dialog}
	use:inertSiblings={true}
	use:bodyScrollLock={true}
	use:clickOutside
	on:clickOutside={handleOutsideClick}
>
	<IconButton class="close" on:click={() => dispatch('close')}>
		<SvgBuilder svgObj={cross} role="img" title="Close panel" />
	</IconButton>
	<slot />
</dialog>

<style>
	dialog {
		display: flex;
		flex-direction: column;
		border-radius: 0.8rem;
		background-color: var(--bg-color-highlight-30);
		box-shadow: var(--shadow-color) 0 0 2rem;
	}

	dialog::backdrop {
		background-color: var(--bg-color-alpha-50);
		backdrop-filter: blur(2px);
	}
</style>
