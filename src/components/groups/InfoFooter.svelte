<script lang="ts">
	import SvgBuilder from '../common/SvgBuilder.svelte';
	import { linkedIn, github } from '../../assets/svgObjects';
</script>

<div>
	<div class="flex-cc links">
		<a href="https://www.linkedin.com/in/igeorgiev-dev" aria-label="LinkedIn">
			<SvgBuilder svgObj={linkedIn} role="presentation" />
		</a>
		<a href="https://github.com/Pronian" aria-label="GitHub">
			<SvgBuilder svgObj={github} role="presentation" />
		</a>
	</div>
</div>
