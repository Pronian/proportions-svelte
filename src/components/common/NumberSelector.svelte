<script lang="ts">
    export let label: string;
    export let value: number;
    export let min: number | undefined = undefined;
    export let max: number | undefined = undefined;
    export let step: number = 1
    let className = '';
    export { className as class};
</script>

<label class={className}>
    {label}:
    <input type="number" {min} {max} {step} bind:value />
</label>

<style>
    label {
        display: flex;
        gap: 1.5rem;
    }
</style>