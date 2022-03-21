<script lang="ts">
	export let colors: string[];
	export let label: string = '';
	export let value: string;
	export let group: string | undefined = undefined;

	function keySelect(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			group = value;
		}
	}

	$: selected = group === value;
</script>

<div
	class="cont"
	class:selected
	tabindex="0"
	on:click={() => (group = value)}
	on:keypress={keySelect}
>
	<input type="radio" bind:group {value} style:display="none" />
	{#if label}
		<div class="label">{label}</div>
	{/if}
	<div class="flex-cc colors">
		{#each colors as color}
			<div style:background-color={color} />
		{/each}
	</div>
</div>

<style>
	.cont {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
		gap: 0.5rem;
		border-radius: 0.8rem;
	}

	.cont:focus,
	.cont:hover {
		cursor: pointer;
		outline: none;
		background-color: var(--bg-color-highlight-40);
	}

	.selected .label {
		font-weight: bold;
	}

	.colors {
		aspect-ratio: 4 / 1;
		box-sizing: content-box;
		border: 0.2rem solid var(--bg-color-highlight-40);
		border-radius: 0.2rem;
	}

	:is(.selected:focus, .selected:hover) .colors {
		border-color: var(--bg-color-highlight-60);
	}

	.cont.selected .colors {
		border-color: var(--primary-color-conceal-40);
	}
</style>
