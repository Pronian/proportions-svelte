<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import { roundIfNeeded } from '../../util/number';
	import { evaluateNumberExpression } from '../../util/numberExpression';
	import type { ExpressionValues } from '../../types/proportion';
	export let label: string;
	export let expression: string = '';
	export let roundingDigits: number = 3;

	let value: string = evaluateNumberExpression(expression)?.toString() || '';
	let computedValue: string | undefined;
	let isInvalid: boolean = false;
	let lostFocus: boolean = true;

	const dispatch = createEventDispatcher();

	function onFocus() {
		if (!isInvalid) {
			value = expression;
		}
		lostFocus = false;
	}

	function onBlur() {
		if (!isInvalid) {
			expression = value;
			value = computedValue || '';
		}
		lostFocus = true;
	}

	function compute(expression: string, roundingDigits: number) {
		if (expression.trim() === '') {
			// Do not consider empty expressions as invalid
			// This happens when the component is initialized without an expression
			isInvalid = false;
			return;
		}

		let result = evaluateNumberExpression(expression);
		if (result !== undefined) {
			const computedNumberValue = roundIfNeeded(result, roundingDigits);
			computedValue = computedNumberValue.toString();
			isInvalid = false;
			if (lostFocus) value = computedValue;
			const eventDetail: ExpressionValues = {
				computed: computedNumberValue,
				expression: expression
			};
			dispatch('compute', eventDetail);
		} else {
			isInvalid = true;
		}
	}

	function getCurrentExpression(expression: string, value: string) {
		return lostFocus ? expression : value;
	}

	$: currentExpression = getCurrentExpression(expression, value);

	$: compute(currentExpression, roundingDigits);
</script>

<label>
	<span class="aria-only">{label}</span>
	<input bind:value type="text" placeholder={label} on:focus={onFocus} on:blur={onBlur} />
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
		background-color: var(--primary-color-conceal-95);
		color: var(--text-color);
		text-align: center;
		width: 100%;
		padding: 0.8rem;
		margin-bottom: 2rem;
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

	.invalid-feedback {
		position: absolute;
		width: 100%;
		bottom: 0;
		color: var(--secondary-color);
		font-size: small;
	}
</style>
