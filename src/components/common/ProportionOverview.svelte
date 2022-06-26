<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import type { ProportionModel } from '../../stores/proportionModel';
	import Button from './Button.svelte';
	import SvgBuilder from './SvgBuilder.svelte';
	import { arrowNarrowRight } from '../../assets/svgObjects';
	import { getUuidV4 } from '../../util/uuid';

	export let proportion: ProportionModel;
	export let editUnits = false;

	let error = {
		shownFor: '',
		message: '',
		id: getUuidV4()
	};

	const dispatch = createEventDispatcher();

	function onCancel() {
		dispatch('cancel');
	}

	function onSave() {
		if (proportion.a.unit && !proportion.b.unit) {
			error.message = 'Please enter a unit for the second value.';
			error.shownFor = 'b';
		} else if (!proportion.a.unit && proportion.b.unit) {
			error.message = 'Please enter a unit for the first value.';
			error.shownFor = 'a';
		} else {
			error.shownFor = '';
		}

		if (!error) {
			dispatch('save', proportion);
		}
	}

	function clearError() {
		error.shownFor = '';
	}
</script>

<div class="cont">
	{#if !editUnits && proportion.a.unit && proportion.b.unit}
		<div class="prop-cont">
			<div class="a-value bottom-border">
				{proportion.a.computed}
			</div>
			<div class="rel">is</div>
			<div class="b-value bottom-border">
				{proportion.b.computed}
			</div>
			<div class="a-unit">
				{proportion.a.unit}
			</div>
			<div class="b-unit">
				{proportion.b.unit}
			</div>
		</div>
	{:else if !editUnits}
		<div class="prop-cont short">
			<div class="a-value two-row">
				{proportion.a.computed}
			</div>
			<div class="flex-cc rel">
				<SvgBuilder class="arrow" svgObj={arrowNarrowRight} role="img" title="relates to" />
			</div>
			<div class="b-value two-row">
				{proportion.b.computed}
			</div>
		</div>
	{:else}
		<div class="prop-cont">
			<div class="a-value">
				{proportion.a.computed}
			</div>
			<div class="flex-cc rel">is</div>
			<div class="b-value">
				{proportion.b.computed}
			</div>
			<input
				class="a-unit bl-corner"
				bind:value={proportion.a.unit}
				on:focus={clearError}
				placeholder="kg"
				aria-label="Unit for first value"
				aria-describedby={error.shownFor === 'a' ? error.id : null}
			/>
			<input
				class="b-unit br-corner"
				bind:value={proportion.b.unit}
				on:focus={clearError}
				placeholder="lb"
				aria-label="Unit for second value"
				aria-describedby={error.shownFor === 'b' ? error.id : null}
			/>
		</div>

		{#if error.shownFor}
			<div class="error" id={error.id} transition:slide>
				{error.message}
			</div>
		{/if}

		<div class="flex-cc buttons">
			<Button on:click={onSave}>Save</Button>
			<Button on:click={onCancel} type="subtle">Cancel</Button>
		</div>
	{/if}
</div>

<style>
	.cont {
		width: 28rem;
		margin: auto;
	}

	.prop-cont {
		--normal-border: 1px solid var(--text-color-alpha-30);
		--border-radius: 1rem;
		display: grid;
		height: 8rem;
		grid-template-columns: 2fr 1fr 2fr;
		grid-template-rows: 1fr 1fr;
		border-radius: var(--border-radius);
		box-shadow: inset 0 0 0.5rem var(--text-color);
		text-align: center;
	}

	.prop-cont.short {
		height: 5rem;
	}

	.prop-cont > * {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
	}

	.error {
		margin-top: 1.4rem;
		font-size: 1.4rem;
		text-align: center;
		color: var(--secondary-color);
	}

	.buttons {
		margin-top: 2rem;
	}

	.a-value {
		grid-column: 1;
		grid-row: 1;
	}

	.rel {
		grid-column: 2;
		grid-row: 1 / span 2;
	}

	.bottom-border {
		border-bottom: var(--normal-border);
	}

	.two-row {
		grid-row-end: span 2;
		border: none;
	}

	.prop-cont :global(.arrow) {
		width: 3rem;
	}

	input {
		all: unset;
		box-sizing: border-box;
		width: 100%;
		background-color: var(--primary-color-alpha-40);
	}

	input::placeholder {
		color: var(--text-color-alpha-30);
	}

	.bl-corner {
		border-radius: 0 0 0 var(--border-radius);
	}

	.br-corner {
		border-radius: 0 0 var(--border-radius) 0;
	}
</style>
