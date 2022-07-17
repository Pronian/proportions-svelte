<script lang="ts">
	import SidePanel from '../common/SidePanel.svelte';
	import ProportionOverview from '../common/ProportionOverview.svelte';
	import IconButton from '../common/IconButton.svelte';
	import SvgBuilder from '../common/SvgBuilder.svelte';
	import { uiState } from '../../stores/uiState';
	import { starredProportions } from '../../stores/starredProportions';
	import { upload, trash } from '../../assets/svgObjects';
</script>

<SidePanel
	class="side-menu"
	position="left"
	show={$uiState.isMenuOpen}
	positionBehavior="in-place"
	maxWidth={400}
	on:placementStatic={(event) => uiState.setMenuStatic(event.detail)}
	on:close={() => uiState.toggleMenu(false)}
>
	<h2>Saved proportions</h2>
	{#each $starredProportions as [id, prop] (id)}
		<div class="starred-container">
			<ProportionOverview proportion={prop} />
			<div class="starred-buttons">
				<IconButton class="butt-action">
					<SvgBuilder svgObj={upload} role="img" title="Load saved proportion" />
				</IconButton>
				<IconButton class="butt-action">
					<SvgBuilder svgObj={trash} role="img" title="Delete saved proportion" />
				</IconButton>
			</div>
		</div>
	{/each}
</SidePanel>

<style>
	:global(.side-menu) {
		/* 4.9rem is the height of the header */
		min-height: calc(100vh - 4.9rem);
	}

	.starred-container {
		display: flex;
		margin-bottom: 2rem;
	}

	.starred-buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		margin: 0 0.5rem 0 1rem;
	}

	.starred-container :global(.butt-action) {
		width: 3rem;
	}
</style>
