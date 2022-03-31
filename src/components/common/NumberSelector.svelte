<script lang="ts">
	export let label: string;
	export let value: number;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: number = 1;
	let className = '';
	export { className as class };
</script>

<label class={className}>
	{label}:
	<input type="number" {min} {max} {step} bind:value />
</label>

<style>
	label {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		white-space: nowrap;
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}

	input {
		background-color: var(--primary-color-conceal-95);
		color: var(--text-color);
		text-align: center;
		font-size: 1.6rem;
		width: 100%;
		min-width: 10rem;
		padding: 0.8rem;
		border-radius: 0.8rem;
		border: 2px solid var(--primary-color);
	}

	input::placeholder {
		color: var(--text-color-alpha-60);
	}

	input:focus {
		outline: none;
		background-color: var(--secondary-color-conceal-95);
		border-color: var(--secondary-color);
	}
</style>
