<script lang="ts">
	import { onMount } from "svelte";
  import Counter from './components/Counter.svelte';
  import InputNumberExpression from './components/InputNumberExpression.svelte';
  import { generateAlphaColors } from './util/colors';

  onMount(() => {
    generateAlphaColors(['--bg-color', '--text-color', '--primary-color', '--secondary-color']);
  });
</script>

<main>
  <InputNumberExpression label="Enter value for A"/>
  <Counter />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
