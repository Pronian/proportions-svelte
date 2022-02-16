<script lang="ts">
    let className = '';
    export { className as class };
</script>

<button class={className} {...$$restProps} on:click on:focus on:blur>
    <slot/>
</button>

<style>
    button {
        aspect-ratio: 1/1;
        background-color: transparent;
        color: var(--text-color);
        border: 0.2rem solid var(--secondary-color-a5);
        border-radius: 0.8rem;
        transition: transform, border-color 0.3s ease-in-out;
    }

    button:hover, button:focus {
        outline: none;
        border-color: var(--secondary-color);
    }

    button:active {
        transform: scale(0.9);
    }
</style>