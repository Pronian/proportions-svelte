<script lang="ts">
	import { proportionStore } from '../../stores/proportionModel';
	export let tag = 'h2';

	$: isInitialized =
		$proportionStore.a.expression && $proportionStore.b.expression && $proportionStore.c.expression;
	$: result = proportionStore.getResult(undefined, 'N/A') ?? $proportionStore;
</script>

<svelte:element this={tag} class="cont">
	{#if isInitialized}
		<span class="left prim">{$proportionStore.a.computed}</span>
		<span class="mid">relates to</span>
		<span class="right"><span class="prim">{$proportionStore.b.computed}</span> as</span>

		<span class="left prim">{$proportionStore.c.computed}</span>
		<span class="mid">relates to</span>
		<span class="right prim">{result}</span>
	{:else}
		<span class="left prim">Value A</span>
		<span class="mid">relates to</span>
		<span class="right"><span class="prim">Value B</span> as</span>

		<span class="left prim">Value C</span>
		<span class="mid">relates to</span>
		<span class="right prim">X</span>
	{/if}
</svelte:element>

<style>
	.cont {
		display: grid;
		grid-template: 1fr 1fr / auto auto auto;
		column-gap: 0.5rem;
		margin: 2rem;
		font-size: 2rem;
		line-height: 1.5;
		font-weight: 400;
	}

	.left {
		justify-self: end;
	}

	.right {
		justify-self: start;
	}

	@media (min-width: 768px) {
		.cont {
			column-gap: 1rem;
			margin: 4rem 2rem;
			font-size: 2.5rem;
			letter-spacing: 0.5px;
		}
	}

	.prim {
		font-weight: 600;
		color: var(--primary-color);
	}
</style>
