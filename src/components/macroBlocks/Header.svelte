<script>
	import IconButton from '../common/IconButton.svelte';
	import SvgBuilder from '../common/SvgBuilder.svelte';
	import { cogSolid } from '../../assets/svgObjects';
	import { uiState } from '../../stores/uiState';
</script>

<header class="flex-cc">
	<div />
	<div class="title"><h1>Svelte Proportions</h1></div>
	<div>
		<IconButton class="settings-btn" on:click={() => uiState.toggleSettings()}>
			<SvgBuilder class="cog" svgObj={cogSolid} role="img" />
		</IconButton>
	</div>
</header>

<style>
	header {
		background-color: var(--bg-color);
		box-shadow: var(--shadow-color) 0 0.3rem 1rem;
		position: sticky;
		z-index: 1;
		top: 0;
		margin-bottom: 2rem;
	}

	div {
		flex: 1;
	}

	.title {
		text-align: center;
		flex: 2;
	}

	h1 {
		margin: 1rem 0.5rem;
		font-size: clamp(1.5rem, 2.5vw, 2.5rem);
	}

	header :global(.settings-btn) {
		margin: 0.5rem 0.5rem 0.5rem auto;
	}

	header :global(.cog) {
		fill: currentColor;
		aspect-ratio: 1 / 1;
		width: 3rem;
	}
</style>
