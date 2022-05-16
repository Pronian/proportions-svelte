<script>
	import IconButton from '../common/IconButton.svelte';
	import SvgBuilder from '../common/SvgBuilder.svelte';
	import { cogSolid, menu } from '../../assets/svgObjects';
	import { uiState } from '../../stores/uiState';
</script>

<header class="flex-cc">
	<div>
		<IconButton class="menu-btn" on:click={() => uiState.toggleMenu()}>
			<SvgBuilder class="menu" svgObj={menu} role="img" />
		</IconButton>
	</div>
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
	}

	@media (min-width: 768px) {
		header {
			margin-bottom: 3rem;
		}
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

	header :global(.menu-btn) {
		margin: 0.5rem auto 0.5rem 0.5rem;
	}

	header :global(.cog),
	header :global(.menu) {
		fill: currentColor;
		aspect-ratio: 1 / 1;
		width: 3rem;
	}
</style>
