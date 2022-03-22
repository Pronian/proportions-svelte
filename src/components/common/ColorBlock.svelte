<script lang="ts">
	export let colors: string[];
	export let label: string = '';
	export let value: string;
	export let group: string | undefined = undefined;
	let className: string = '';
	export { className as class };

	function keySelect(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			group = value;
		}
	}

	$: selected = group === value;
</script>

<div
	class="cont {className}"
	class:selected
	tabindex="0"
	role="button"
	on:click={() => (group = value)}
	on:keypress={keySelect}
>
	<input type="radio" bind:group {value} style:display="none" />
	{#if label}
		<div class="label">{label}</div>
	{/if}
	<div class="flex-cc colors">
		{#each colors as color}
			<div class="color" style:background-color={color} />
		{/each}
	</div>
</div>

<style>
	.cont {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 0.5rem;
		border-radius: 0.8rem;
	}

	.cont:focus,
	.cont:hover {
		cursor: pointer;
		outline: none;
		background-color: var(--bg-color-highlight-60);
	}

	.selected .label {
		font-weight: bold;
	}

	.colors {
		align-items: stretch;
		aspect-ratio: 5 / 1;
		box-sizing: content-box;
		border: 0.2rem solid var(--bg-color-highlight-60);
		border-radius: 0.2rem;
	}

	.color {
		flex: 1;
	}

	:is(.selected:focus, .selected:hover) .colors {
		border-color: var(--bg-color-highlight-80);
	}

	.cont.selected .colors {
		border-color: var(--primary-color-conceal-40);
	}
</style>
