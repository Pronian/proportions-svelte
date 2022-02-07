<script lang="ts">
	import InputNumberExpression from "./InputNumberExpression.svelte";
	import { arrowNarrowRight } from "../assets/htmlSVGs";
	import { roundIfNeeded } from "../util/number";
	const roundingDigits = 3;

	let a = 1;
	let b = 2;
	let c = 3;
</script>


<section class="prop-main">
	<h2 class="aria-only">Enter values for A, B, which will determine the ratio. And entering value C will use the ratio to generate the new proportion</h2>
	<div class="flex-cc prop-row">
		<div class="prop-val">
			<InputNumberExpression label="value A" initialValue={a.toString()} on:compute={(event) => a = event.detail} {roundingDigits} />
		</div>
		<div class="arrow" aria-label="relates to">{@html arrowNarrowRight}</div>
		<div class="prop-val">
			<InputNumberExpression label="value B" initialValue={b.toString()} on:compute={(event) => b = event.detail} {roundingDigits} />
		</div>
	</div>
	<div class="flex-cc prop-row">
		<div class="prop-val">
			<InputNumberExpression label="as value C" initialValue={c.toString()} on:compute={(event) => c = event.detail} {roundingDigits}/>
		</div>
		<div class="arrow" aria-label="to">{@html arrowNarrowRight}</div>
		<div class="flex-cc prop-val">
			<div class="prop-res">{roundIfNeeded(c*b/a, roundingDigits)}</div>
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

	.arrow {
		color: var(--primary-color);
		width: 3.5rem;
		height: 3.5rem;
		margin: 0 1rem;
	}
</style>