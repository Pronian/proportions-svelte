<header class="flex-cc">
    <div></div>
    <div class="title"><h1>Svelte Proportions</h1></div>
    <div></div>
</header>

<style>
    header {
        box-shadow: var(--shadow-color) 0 0.3rem 1rem;
        position: sticky;
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
</style>