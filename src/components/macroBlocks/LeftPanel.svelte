<script lang="ts">
	import SidePanel from '../common/SidePanel.svelte';
	import ProportionOverview from '../common/ProportionOverview.svelte';
	import { uiState } from '../../stores/uiState';
	import { starredProportions } from '../../stores/starredProportions';
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
			<button>Load</button>
			<button>Edit</button>
			<button>Delete</button>
		</div>
	{/each}
</SidePanel>

<style>
	:global(.side-menu) {
		/* 4.9rem is the height of the header */
		min-height: calc(100vh - 4.9rem);
	}
</style>
