<script lang="ts">
  import Proportions from "./components/Proportions.svelte";
  import Header from "./components/Header.svelte";
  import { generateAlphaColors } from './util/colors';
	import { onMount } from "svelte";

  onMount(() => {
    generateAlphaColors(['--bg-color', '--text-color', '--primary-color', '--secondary-color']);
  });
</script>

<Header/>
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
