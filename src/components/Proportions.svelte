<script lang="ts">
	import InputNumberExpression from "./InputNumberExpression.svelte";
	import { roundIfNeeded } from "../util/number";

	let a = 1;
	let b = 2;
	let c = 3;
	const roundingDigits = 3;
</script>


<div class="flex-cc prop-row">
	<InputNumberExpression label="Value A" initialValue={a.toString()} on:compute={(event) => a = event.detail} {roundingDigits} />
	<InputNumberExpression label="Value B" initialValue={b.toString()} on:compute={(event) => b = event.detail} {roundingDigits} />
</div>
<div class="flex-cc prop-row">
	<InputNumberExpression label="Value C" initialValue={c.toString()} on:compute={(event) => c = event.detail} {roundingDigits}/>
	<div class="flex-cc prop-res">Result: {roundIfNeeded(c*b/a, roundingDigits)}</div>
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