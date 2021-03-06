<script lang="ts">
	import { slide } from 'svelte/transition';
	import InputNumberExpression from '../common/InputNumberExpression.svelte';
	import IconButton from '../common/IconButton.svelte';
	import SvgBuilder from '../common/SvgBuilder.svelte';
	import { arrowNarrowRight, refresh, plus, star, trash } from '../../assets/svgObjects';
	import { createSwapAnimation } from '../../actions/swapRotateAnimation';
	import { dynamicFontSize } from '../../actions/dynamicFontSize';
	import { proportionStore } from '../../stores/proportionModel';
	import ProportionDescription from '../common/ProportionDescription.svelte';

	export let roundingDigits = 3;

	const swapAnim = createSwapAnimation({ duration: 500, verticalOriginOffset: -10 });

	function swapValues() {
		swapAnim.triggerAnimation(() => {
			proportionStore.swap();
		});
	}

	$: proportionStore.updateRounding(roundingDigits);
	$: result = $proportionStore && proportionStore.getResult();
</script>

<ProportionDescription />
<section class="prop-main">
	<div class="prop-row">
		<div class="prop-val" use:swapAnim.actionRotateRight>
			<InputNumberExpression
				label="Value A"
				expression={$proportionStore.a.expression}
				{roundingDigits}
				on:compute={(event) => ($proportionStore.a = event.detail)}
			/>
		</div>
		<SvgBuilder class="arrow" svgObj={arrowNarrowRight} role="img" title="relates to" />
		<div class="prop-val" use:swapAnim.actionRotateLeft>
			<InputNumberExpression
				label="Value B"
				expression={$proportionStore.b.expression}
				{roundingDigits}
				on:compute={(event) => ($proportionStore.b = event.detail)}
			/>
		</div>
		<IconButton class="btn-action" on:click={swapValues}>
			<SvgBuilder svgObj={refresh} role="img" title="Invert ratio" />
		</IconButton>
	</div>
	<div class="prop-row">
		<div class="prop-val">
			<InputNumberExpression
				label="Value C"
				expression={$proportionStore.c.expression}
				{roundingDigits}
				on:compute={(event) => ($proportionStore.c = event.detail)}
			/>
		</div>
		<SvgBuilder class="arrow" svgObj={arrowNarrowRight} role="img" title="relates to" />
		<div class="prop-val">
			<div class="prop-res" use:dynamicFontSize={{ maxFontSize: 16, minHeight: 35 }}>
				{result}
			</div>
		</div>
		{#if $proportionStore.starred}
			<div class="btn-action" />
		{:else}
			<IconButton class="btn-action" on:click={() => {}}>
				<SvgBuilder svgObj={star} role="img" title="Star proportion" />
			</IconButton>
		{/if}
	</div>
</section>

<section class="prop-additional">
	{#each $proportionStore.cArr as arrC, index (arrC.id)}
		<div class="prop-row" transition:slide>
			<div class="prop-val">
				<InputNumberExpression
					label="additional C value {index + 1}"
					expression={arrC.expression || arrC.computed.toString()}
					{roundingDigits}
					on:compute={(event) => proportionStore.updateCProp(arrC.id, event.detail)}
				/>
			</div>
			<SvgBuilder class="arrow" svgObj={arrowNarrowRight} role="img" title="relates to" />
			<div class="prop-val">
				<div class="prop-res" use:dynamicFontSize={{ maxFontSize: 16, minHeight: 35 }}>
					{proportionStore.getResult(arrC.id)}
				</div>
			</div>
			<IconButton class="btn-action" on:click={() => proportionStore.deleteCProp(arrC.id)}>
				<SvgBuilder class="svg-trash" svgObj={trash} role="img" title="Delete additional row" />
			</IconButton>
		</div>
	{/each}
	<IconButton class="btn-add" on:click={() => proportionStore.addCProp()}>
		<SvgBuilder class="svg-plus" svgObj={plus} role="img" title="Add additional result row" />
	</IconButton>
</section>

<style>
	section {
		max-width: 768px;
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 0 1rem;
	}

	.prop-main {
		padding: 4rem 1rem 2rem;
		background-color: var(--bg-color-highlight-20);
	}

	@media (min-width: 768px) {
		section {
			padding: 0 3rem;
		}

		.prop-main {
			padding: 4rem 3rem 2rem;
			border-radius: 1rem;
		}
	}

	.prop-row {
		width: 100%;
		display: flex;
		gap: 1rem;
	}

	.prop-res {
		background-color: var(--primary-color-conceal-95);
		border-radius: 0.8rem;
		min-width: 10rem;
		padding: 0.8rem 1rem;
		width: 100%;
	}

	.prop-val {
		flex: 3;
	}

	.prop-row :global(.arrow) {
		color: var(--primary-color);
		width: 3.5rem;
		height: 3.5rem;
	}

	.prop-row :global(.btn-action) {
		width: 3.5rem;
		height: 3.5rem;
		margin-bottom: 2rem;
	}

	.prop-additional {
		margin-top: 4rem;
	}

	.prop-additional :global(.btn-add) {
		background-color: var(--secondary-color);
		border-radius: 50%;
		margin: 0 auto;
		color: var(--bg-color);
	}

	.prop-additional :global(.btn-add:focus),
	.prop-additional :global(.btn-add:hover) {
		background-color: var(--secondary-color-conceal-50);
		color: var(--text-color);
	}

	.prop-additional :global(.svg-trash) {
		width: 2.3rem;
		height: 2.3rem;
	}

	.prop-additional :global(.svg-plus) {
		width: 4.5rem;
		height: 4.5rem;
	}
</style>
