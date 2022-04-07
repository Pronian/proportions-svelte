<script lang="ts">
	let className = '';
	export { className as class };
	export const type: 'primary' | 'secondary' | 'transparent' = 'primary';
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
		border-radius: 2rem;
		padding: 1rem;
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
		background-color: var(--primary-color);
	}

	.primary:hover,
	.primary:focus {
		background-color: var(--primary-color-conceal-50);
	}

	button.secondary {
		background-color: var(--secondary-color);
	}

	.secondary:hover,
	.secondary:focus {
		background-color: var(--secondary-color-conceal-50);
	}
</style>
