<script lang="ts">
	import { proportionStore } from '../../stores/proportionModel';
	export let tag = 'h2';

	$: isInitialized =
		$proportionStore.a.expression && $proportionStore.b.expression && $proportionStore.c.expression;
	$: result = proportionStore.getResult() ?? $proportionStore;
</script>

<svelte:element this={tag} class="cont">
	{#if isInitialized}
		<span class="prim">{$proportionStore.a.computed}</span> relates to
		<span class="prim">{$proportionStore.b.computed}</span>
		as<br />
		<span class="prim">{$proportionStore.c.computed}</span> relates to
		<span class="prim">{result}</span>
	{:else}
		<span class="prim">Value A</span> relates to <span class="prim">Value B</span> as<br />
		<span class="prim">Value C</span> relates to <span class="prim">X</span>
	{/if}
</svelte:element>

<style>
	.cont {
		margin: 2rem;
		font-size: 2rem;
		line-height: 1.5;
		font-weight: 400;
	}

	@media (min-width: 768px) {
		.cont {
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
