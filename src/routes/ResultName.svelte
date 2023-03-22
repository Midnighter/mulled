<script lang="ts">
    // Absolute project imports
    import type { MultiPackageV2Image } from '$lib/mulled';

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
    <pre><code>{name}</code></pre>
    <span>{@html symbol}</span>
</div>

<style>
    pre {
        display: inline-block;
        min-width: 93ch;
        min-height: 1em;
        padding: 1em;
        background-color: var(--base02);
        color: var(--base1);
        border-radius: 0.25rem;
    }
</style>
