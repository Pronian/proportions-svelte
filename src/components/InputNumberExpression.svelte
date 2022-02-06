<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { slide } from "svelte/transition";
	import { roundIfNeeded } from "../util/number";
	import { evaluateNumberExpression } from "../util/numberExpression";
	export let label: string;
	export let initialValue: string = '';
	export let roundingDigits: number = 3;

	let value: string = initialValue;
	let computedValue: string | undefined;
	let isInvalid: boolean = false;
	let lostFocus: boolean = false;
	let expressionValue: string = '';

	const dispatch = createEventDispatcher();

	function onFocus() {
		if (!isInvalid) {
			value = expressionValue;
		}
		lostFocus = false;
	}

	function onBlur() {
		if (!isInvalid) {
			expressionValue = value;
			value = computedValue || '';
		}
		lostFocus = true;
	}

	$: {
		let result = evaluateNumberExpression(value);
		if (result !== undefined) {
			computedValue = roundIfNeeded(result, roundingDigits).toString();
			dispatch('compute', computedValue);
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
		<div class="invalid-feedback" transition:slide>Invalid value</div>
	{/if}
</label>

<style>
	label {
		display: block;
		position: relative;
		min-width: 10rem;
	}
	
	input {
		background-color: var(--primary-color-a1);
		color: var(--text-color);
		text-align: center;
		width: 100%;
		padding: 0.8rem;
		margin-bottom: 2rem;
		border-radius: 0.8rem;
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
		position: absolute;
		width: 100%;
		bottom: 0;
		color: var(--secondary-color);
		font-size: small;
	}
</style>