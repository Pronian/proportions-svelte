<script lang="ts">
	import InputNumberExpression from "./InputNumberExpression.svelte";
	import { arrowNarrowRight } from "../assets/htmlSVGs";
	import { roundIfNeeded } from "../util/number";
	const roundingDigits = 3;

	let a = 1;
	let b = 2;
	let c = 3;
</script>


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

<style>
	.prop-row {
		margin-bottom: 1rem;
	}

	.prop-res {
		min-width: 10rem;
		padding: 1rem;
	}
</style>