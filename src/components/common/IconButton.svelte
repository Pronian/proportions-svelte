<script lang="ts">
	let className = '';
	export { className as class };
</script>

<button class="flex-cc {className}" {...$$restProps} on:click on:focus on:blur>
	<slot />
</button>

<style>
	button {
		aspect-ratio: 1/1;
		background-color: transparent;
		color: var(--text-color);
		outline: none;
		border: none;
		border-radius: 0.8rem;
		padding: 0.3rem;
		transition: transform, border-color, background-color, color 0.3s ease-in-out;
	}

	button:not(:disabled) {
		cursor: pointer;
	}

	button:hover,
	button:focus {
		background-color: var(--secondary-color-alpha-20);
		outline: 0.2rem solid var(--secondary-color);
	}

	button:active {
		transform: scale(0.9);
	}
</style>
