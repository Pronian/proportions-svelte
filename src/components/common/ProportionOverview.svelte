<script lang="ts">
	import type { ProportionModel } from '../../stores/proportionModel';
	import SvgBuilder from './SvgBuilder.svelte';
	import { arrowNarrowRight } from '../../assets/svgObjects';

	export let proportion: ProportionModel;
	export let editUnits = false;
</script>

<div class="cont">
	{#if !editUnits && proportion.a.unit && proportion.b.unit}
		<div class="a-value">
			{proportion.a.computed}
		</div>
		<div class="rel">is</div>
		<div class="b-value">
			{proportion.b.computed}
		</div>
		<div class="a-unit side-borders">
			{proportion.a.unit}
		</div>
		<div class="b-unit">
			{proportion.b.unit}
		</div>
	{:else if !editUnits}
		<div class="a-value two-row">
			{proportion.a.computed}
		</div>
		<div class="flex-cc rel">
			<SvgBuilder class="arrow" svgObj={arrowNarrowRight} role="img" title="relates to" />
		</div>
		<div class="b-value two-row">
			{proportion.b.computed}
		</div>
	{:else}
		<div class="a-value">
			{proportion.a.computed}
		</div>
		<div class="flex-cc rel side-borders">is</div>
		<div class="b-value">
			{proportion.b.computed}
		</div>
		<input class="a-unit" bind:value={proportion.a.unit} />
		<input class="b-unit" bind:value={proportion.b.unit} />
	{/if}
</div>

<style>
	.cont {
		--normal-border: 1px solid var(--text-color);
		display: grid;
		grid-template-columns: 2fr 1fr 2fr;
		grid-template-rows: 1fr 1fr;
		width: 28rem;
		height: 5rem;
		/* border: var(--normal-border); */
		border-radius: 1rem;
		box-shadow: inset 0 0 0.5rem var(--text-color);
		text-align: center;
	}

	.cont > * {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
	}

	.side-borders {
		border-left: var(--normal-border);
		border-right: var(--normal-border);
	}

	.a-value {
		grid-column: 1;
		grid-row: 1;
	}

	.rel {
		grid-column: 2;
		grid-row: 1 / span 2;
	}

	.a-value,
	.b-value {
		border-bottom: var(--normal-border);
	}

	.two-row {
		grid-row-end: span 2;
		border: none;
	}

	.cont :global(.arrow) {
		width: 3rem;
	}
</style>
