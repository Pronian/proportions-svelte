<script lang="ts">
	import type { ProportionModel } from "../types/proportion";
	import InputNumberExpression from "./InputNumberExpression.svelte";
	import SvgBuilder from "./SvgBuilder.svelte";
	import { arrowNarrowRight } from "../assets/svgObjects";
	import { roundIfNeeded } from "../util/number";
	import { createWritableLS } from "../stores/writableLocalStorage";
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

	$: result = roundIfNeeded($store.c.computed*$store.b.computed/$store.a.computed, roundingDigits);
</script>


<section class="prop-main">
	<h2 class="aria-only">Enter values for A, B, which will determine the ratio. And entering value C will use the ratio to generate the new proportion</h2>
	<div class="flex-cc prop-row">
		<div class="prop-val">
			<InputNumberExpression label="value A" initialExpression={$store.a.expression} {roundingDigits}
				on:compute={(event) => $store.a = event.detail} />
		</div>
		<SvgBuilder class="arrow" svgObj={arrowNarrowRight} role="img" title="relates to"/>
		<div class="prop-val">
			<InputNumberExpression label="value B" initialExpression={$store.b.expression} {roundingDigits}
				on:compute={(event) => $store.b = event.detail} />
		</div>
	</div>
	<div class="flex-cc prop-row">
		<div class="prop-val">
			<InputNumberExpression label="as value C" initialExpression={$store.c.expression} {roundingDigits}
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
		max-width: 60rem;
		width: 100%;
	}
	.prop-row {
		margin-bottom: 1rem;
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