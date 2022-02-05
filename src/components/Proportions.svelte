<script lang="ts">
	import InputNumberExpression from "./InputNumberExpression.svelte";
	import { roundIfNeeded } from "../util/number";

	let a = 1;
	let b = 2;
	let c = 3;
	const roundingDigits = 3;
</script>


<div class="flex-cc">
	<InputNumberExpression label="Value A" initialValue={a.toString()} on:compute={(event) => a = event.detail} {roundingDigits} />
	<InputNumberExpression label="Value B" initialValue={b.toString()} on:compute={(event) => b = event.detail} {roundingDigits} />
</div>
<div class="flex-cc">
	<InputNumberExpression label="Value C" initialValue={c.toString()} on:compute={(event) => c = event.detail} {roundingDigits}/>
	<span>Result: {roundIfNeeded(c*b/a, roundingDigits)}</span>
</div>

<style>
	div {
		display: flex;
	}
</style>