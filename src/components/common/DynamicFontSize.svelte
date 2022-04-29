<script lang="ts">
    import { afterUpdate } from "svelte";

    export const tag = 'div';
    export let maxFontSizePx: number;
    export let text: string;
    let className = '';
    export { className as class};

    let fontSize = maxFontSizePx;
    let ref;

    afterUpdate(() => {
        ref.style.lineHeight = 1;
        const style = getComputedStyle(ref);
        const paddingVertical = parseInt(style.paddingTop) + parseInt(style.paddingBottom);
        let realTextHeight = ref.clientHeight - paddingVertical;

        while (realTextHeight > fontSize && fontSize > 1) {
            fontSize -= 0.5;
            ref.style.fontSize = `${fontSize}px`;
            realTextHeight = ref.clientHeight - paddingVertical;
        }

        ref.style.lineHeight = '';
    });
</script>

<svelte:element this={tag} bind:this={ref} class="el {className}" style:fontSize="{fontSize}px">
    {text}
</svelte:element>
