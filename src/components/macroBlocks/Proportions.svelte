<script lang="ts">
	import InputNumberExpression from '../common/InputNumberExpression.svelte';
	import IconButton from '../common/IconButton.svelte';
	import SvgBuilder from '../common/SvgBuilder.svelte';
	import { arrowNarrowRight, refresh, plus, trash } from '../../assets/svgObjects';
	import { createSwapAnimation } from '../../actions/swapRotateAnimation';
	import { getUuidV4 } from '../../util/uuid';
	import { proportionStore, type ExpressionValues } from '../../stores/proportionModel';

	export let roundingDigits = 3;

	const swapAnim = createSwapAnimation({ duration: 500, verticalOriginOffset: -10 });

	function swapValues() {
		swapAnim.triggerAnimation(() => {
			proportionStore.swap(roundingDigits);
		});
	}

	function addRow() {
		$proportionStore.cArr.push({
			id: getUuidV4(),
			computed: $proportionStore.c.computed + $proportionStore.cArr.length + 1,
			expression: ''
		});
		$proportionStore.cArr = $proportionStore.cArr;
	}

	function updateRow(id: string, newValues: ExpressionValues) {
		const index = $proportionStore.cArr.findIndex((c) => c.id === id);

		if (index > -1) {
			$proportionStore.cArr[index] = { ...newValues, id };
		}
	}

	function deleteRow(id: string) {
		$proportionStore.cArr = $proportionStore.cArr.filter((c) => c.id !== id);
	}

	$: result = $proportionStore && proportionStore.getResult(roundingDigits);
</script>

<section class="prop-main">
	<h2 class="aria-only">
		Enter values for A, B, which will determine the ratio. And entering value C will use the ratio
		to generate the new proportion
	</h2>
	<div class="flex-cc prop-row">
		<div class="prop-val" use:swapAnim.actionRotateRight>
			<InputNumberExpression
				label="value A"
				expression={$proportionStore.a.expression}
				{roundingDigits}
				on:compute={(event) => ($proportionStore.a = event.detail)}
			/>
		</div>
		<SvgBuilder class="arrow" svgObj={arrowNarrowRight} role="img" title="relates to" />
		<div class="prop-val" use:swapAnim.actionRotateLeft>
			<InputNumberExpression
				label="value B"
				expression={$proportionStore.b.expression}
				{roundingDigits}
				on:compute={(event) => ($proportionStore.b = event.detail)}
			/>
		</div>
	</div>
	<IconButton on:click={swapValues}>
		<SvgBuilder svgObj={refresh} role="img" title="Invert ratio" />
	</IconButton>
	<div class="flex-cc prop-row">
		<div class="prop-val">
			<InputNumberExpression
				label="as value C"
				expression={$proportionStore.c.expression}
				{roundingDigits}
				on:compute={(event) => ($proportionStore.c = event.detail)}
			/>
		</div>
		<SvgBuilder class="arrow" svgObj={arrowNarrowRight} role="img" title="to" />
		<div class="flex-cc prop-val">
			<div class="prop-res">{result}</div>
		</div>
	</div>
</section>

<section class="prop-additional">
	{#each $proportionStore.cArr as arrC (arrC.id)}
		<div class="flex-cc prop-row">
			<div class="prop-val">
				<InputNumberExpression
					label="as value C"
					expression={arrC.expression || arrC.computed.toString()}
					{roundingDigits}
					on:compute={(event) => updateRow(arrC.id, event.detail)}
				/>
			</div>
			<SvgBuilder class="arrow" svgObj={arrowNarrowRight} role="img" title="to" />
			<div class="flex-cc prop-val">
				<div class="prop-res">{proportionStore.getResult(roundingDigits, arrC.id)}</div>
			</div>
		</div>
		<IconButton on:click={() => deleteRow(arrC.id)}>
			<SvgBuilder class="svg-trash" svgObj={trash} role="img" title="Delete result row" />
		</IconButton>
	{/each}
	<IconButton class="btn-add" on:click={addRow}>
		<SvgBuilder class="svg-plus" svgObj={plus} role="img" title="Add result row" />
	</IconButton>
</section>

<style>
	section {
		max-width: 64rem;
		width: 100%;
		display: grid;
		grid-template: auto / 1fr 3.5rem;
		gap: 2rem 1rem;
	}

	.prop-row {
		align-items: flex-start;
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

	.prop-additional {
		margin-top: 2rem;
	}

	.prop-additional :global(.btn-add) {
		grid-column: 1 / span 2;
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
