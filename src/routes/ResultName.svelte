<script lang="ts">
    // Absolute project imports
    import type { ITheme } from '$lib/theme';
    import type { MultiPackageV2Image } from '$lib/mulled';

    export let theme: ITheme;
    export let image: MultiPackageV2Image | null;
    export let exists: boolean | null;

    let name: string;
    let symbol: string;

    $: name = image ? image.toString() : '';

    $: if (exists === null) {
        symbol = '';
    } else if (exists) {
        symbol = '&#10004;';
    } else {
        symbol = '&#10060;';
    }
</script>

<div>
    <pre
        style="background-color: {theme.backHighlight}; color: {theme.fontHighlight};"> <code
            >{name}</code
        > {#if name}
            <button
                id="copy"
                on:click|preventDefault={() => navigator.clipboard.writeText(name)}
                >&#128203;</button
            >
        {/if} </pre>
    <span>{@html symbol}</span>
</div>

<style>
    pre {
        display: inline-block;
        min-width: 93ch;
        min-height: 1.5rem;
        padding: 0.5rem;
        border-radius: 0.25rem;
    }
    code {
        -webkit-touch-callout: all;
        -webkit-user-select: all;
        -khtml-user-select: all;
        -moz-user-select: all;
        -ms-user-select: all;
        user-select: all;
    }
    #copy {
        border: none;
        background-color: transparent;
        cursor: pointer;
    }
    span {
        height: 1rem;
        min-width: 4rem;
        display: inline-block;
    }
</style>
