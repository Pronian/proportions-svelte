<script lang="ts">
	import type { ProportionModel } from '../../stores/proportionModel';

	export let proportion: ProportionModel;
	export let editUnits = false;
</script>

<div class="cont">
	<div class="a-value">
		{proportion.a.computed}
	</div>
	<div class="flex-cc rel">is</div>
	<div class="b-value">
		{proportion.b.computed}
	</div>
	<div class="a-unit" class:edit={editUnits}>
		{#if editUnits}
			<input type="text" />
		{:else}
			{proportion.a.unit}
		{/if}
	</div>
	<div class="b-unit" class:edit={editUnits}>
		{#if editUnits}
			<input type="text" />
		{:else}
			{proportion.b.unit}
		{/if}
	</div>
</div>

<style>
	.cont {
        --normal-border: 1px solid var(--text-color);
		display: grid;
		grid-template-columns: 2fr 1fr 2fr;
		grid-template-rows: 1fr 1fr;
		width: 28rem;
		height: 5rem;
		border: var(--normal-border);
		border-radius: 0.8rem;
		text-align: center;
	}

	.a-value {
		grid-column: 1;
		grid-row: 1;
	}

	.rel {
		grid-column: 2;
		grid-row: 1 / span 2;
		border-left: var(--normal-border);
		border-right: var(--normal-border);
	}

	.a-value,
	.b-value {
		border-bottom: var(--normal-border);
	}
</style>
