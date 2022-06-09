<script lang="ts">
	let className = '';
	export { className as class };
	export let type: 'primary' | 'secondary' | 'transparent' = 'primary';
</script>

<button class="flex-cc {type} {className}" {...$$restProps} on:click on:focus on:blur>
	<slot />
</button>

<style>
	button {
		background-color: transparent;
		color: var(--text-color);
		font-size: 1.8rem;
		outline: none;
		border: none;
		border-radius: 1rem;
		margin: 1rem;
		padding: 1rem;
		min-width: 8rem;
		transition: transform, border-color 0.3s ease-in-out;
	}

	button:not(:disabled) {
		cursor: pointer;
	}

	:hover,
	:focus {
		background-color: var(--secondary-color-alpha-20);
	}

	:active {
		transform: scale(0.9);
	}

	button.primary {
		background-color: var(--primary-color-conceal-30);
	}

	.primary:hover,
	.primary:focus {
		background-color: var(--primary-color-conceal-60);
	}

	button.secondary {
		background-color: var(--secondary-color-conceal-30);
	}

	.secondary:hover,
	.secondary:focus {
		background-color: var(--secondary-color-conceal-60);
	}
</style>
