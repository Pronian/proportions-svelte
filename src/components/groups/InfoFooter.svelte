<script lang="ts">
	import SvgBuilder from '../common/SvgBuilder.svelte';
	import { linkedIn, github } from '../../assets/svgObjects';
</script>

<div class="info">
	<div class="info-author">
		Made with Svelte, TypeScript, and ❤️ by Ivan Georgiev
	</div>
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
	.info {
		margin: 1rem;
	}

	.info-author {
		font-size: 1.4rem;
		color: var(--text-color-conceal-90);
		margin: 1rem 0;
	}

	.info :global(.icon) {
		color: var(--text-color);
		width: 3.5rem;
		height: 3.5rem;
		margin: 1rem;
	}
</style>
