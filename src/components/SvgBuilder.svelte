<script lang="ts">
	import type { SVGObj } from '../assets/svgObjects';

	export let svgObj: SVGObj;
	export let title: string = '';
</script>

<svg xmlns="http://www.w3.org/2000/svg" {...svgObj.attrs} {...$$restProps}>
	{#if title}
		<title>{title}</title>
	{/if}
	<g>{@html svgObj.body}</g>
</svg>
