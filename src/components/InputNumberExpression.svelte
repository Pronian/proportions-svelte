<script lang="ts">
	import { evaluateNumberExpression } from "../util/numberExpression";
	export let label: string;
	export let value: string = '';
	export let roundingDigits: number = 3;

	let computedValue: string | undefined;
	let isInvalid: boolean = false;
	let lostFocus: boolean = false;
	let expressionValue: string = '';

	function onFocus() {
		value = expressionValue;
		lostFocus = false;
	}

	function onBlur() {
		expressionValue = value;
		value = computedValue;
		lostFocus = true;
	}

	$: {
		let result = evaluateNumberExpression(value);
		if (result !== undefined) {
			computedValue = result.toFixed(roundingDigits);
			isInvalid = false;
		} else {
			isInvalid = true;
		}
	}
</script>

<label>
	<span class="aria-only">{label}</span>
	<input bind:value type="text" placeholder={label} inputmode="decimal" 
		on:focus={onFocus}
		on:blur={onBlur}
	>
	{#if lostFocus && isInvalid}
		<div class="invalid-feedback">Invalid value</div>
	{/if}
</label>

<style>
	label {
		display: block;
	}

	input {
		background-color: var(--primary-color-a1);
		color: var(--text-color);
		padding: 0.5rem;
		border-radius: 0.5rem;
		border: 2px solid var(--primary-color);
	}

	input::placeholder {
		color: var(--text-color-a6);
	}

	input:focus {
		outline: none;
		background-color: var(--secondary-color-a1);
		border-color: var(--secondary-color);
	}

	.invalid-feedback {
		color: var(--secondary-color);
		font-size: small;
	}
</style>