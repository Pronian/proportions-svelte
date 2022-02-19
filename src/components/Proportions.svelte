<script lang="ts">
	import type { ProportionModel } from "../types/proportion";
	import InputNumberExpression from "./InputNumberExpression.svelte";
	import IconButton from "./IconButton.svelte";
	import SvgBuilder from "./SvgBuilder.svelte";
	import { arrowNarrowRight, refresh } from "../assets/svgObjects";
	import { roundIfNeeded } from "../util/number";
	import { createWritableLS } from "../stores/writableLocalStorage";
	import { createSwapAnimation } from "../actions/swapRotateAnimation";

	const swapAnim = createSwapAnimation({ duration: 500, verticalOriginOffset: -10 });
	const roundingDigits = 3;

	const initialStore: ProportionModel = {
		a: {
			computed: 1,
			expression: '',
		},
		b: {
			computed: 1,
			expression: '',
		},
		c: {
			computed: 1,
			expression: '',
		},
		cArr: [],
	}

	const store = createWritableLS('proportionModel', initialStore, 3000);

	function swapValues() {
		swapAnim.triggerAnimation(() => {
			$store.c.expression = result.toString();
			const temp = $store.b;
			$store.b = $store.a;
			$store.a = temp;
		});
	}

	$: result = roundIfNeeded($store.c.computed*$store.b.computed/$store.a.computed, roundingDigits);
</script>


<section class="prop-main">
	<h2 class="aria-only">Enter values for A, B, which will determine the ratio. And entering value C will use the ratio to generate the new proportion</h2>
	<div class="flex-cc prop-row">
		<div class="prop-val" use:swapAnim.actionRotateRight>
			<InputNumberExpression label="value A" expression={$store.a.expression} {roundingDigits}
				on:compute={(event) => $store.a = event.detail} />
		</div>
		<SvgBuilder class="arrow" svgObj={arrowNarrowRight} role="img" title="relates to"/>
		<div class="prop-val" use:swapAnim.actionRotateLeft>
			<InputNumberExpression label="value B" expression={$store.b.expression} {roundingDigits}
				on:compute={(event) => $store.b = event.detail} />
		</div>
	</div>
	<IconButton on:click={swapValues}>
		<SvgBuilder svgObj={refresh} role="img" title="Invert ratio" />
	</IconButton>
	<div class="flex-cc prop-row">
		<div class="prop-val">
			<InputNumberExpression label="as value C" expression={$store.c.expression} {roundingDigits}
				on:compute={(event) => $store.c = event.detail} />
		</div>
		<SvgBuilder class="arrow" svgObj={arrowNarrowRight} role="img" title="to"/>
		<div class="flex-cc prop-val">
			<div class="prop-res">{result}</div>
		</div>
	</div>
</section>

<style>
	.prop-main {
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
		background-color: var(--primary-color-a1);
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
</style>