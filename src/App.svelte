<script lang="ts">
  import Proportions from "./components/Proportions.svelte";
  import { generateAlphaColors } from './util/colors';
	import { onMount } from "svelte";

  onMount(() => {
    generateAlphaColors(['--bg-color', '--text-color', '--primary-color', '--secondary-color']);
  });
</script>

<main class="flex-cc">
  <Proportions/>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>
