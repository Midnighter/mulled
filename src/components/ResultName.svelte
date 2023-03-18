<script lang="ts">
    import type { MultiPackageV2Image } from '$lib/mulled';

    export let image: MultiPackageV2Image | null;
    export let exists: boolean | null;
</script>

<div>
    {#if image}
        Image:
        <pre><code>{image.toString()}</code></pre>
        {#if exists !== null}
            {#if exists}
                <span>&#10004;</span>
            {:else}
                <span>&#10060;</span>
            {/if}
        {/if}
    {/if}
</div>
