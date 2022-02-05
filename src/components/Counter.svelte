<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  Clicks: {count}
</button>

<style>
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: var(--text-color);
    background-color: var(--primary-color-a6);
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid var(--text-color);
  }

  button:active {
    background-color: var(--primary-color-a8);
  }
</style>
