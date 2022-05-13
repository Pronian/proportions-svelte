<script lang="ts">
	import SvgBuilder from '../common/SvgBuilder.svelte';
	import { linkedIn, github } from '../../assets/svgObjects';
</script>

<div class="info">
	<div class="flex-cc links">
		<a href="https://www.linkedin.com/in/igeorgiev-dev" aria-label="LinkedIn" target="_blank">
			<SvgBuilder svgObj={linkedIn} role="presentation" class="icon" />
		</a>
		<a href="https://github.com/Pronian" aria-label="GitHub" target="_blank">
			<SvgBuilder svgObj={github} role="presentation" class="icon" />
		</a>
	</div>
</div>

<style>
	.info :global(.icon) {
		color: var(--text-color);
		width: 3.5rem;
		height: 3.5rem;
		margin: 1rem;
	}
</style>
