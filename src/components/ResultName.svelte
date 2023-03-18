<script lang="ts">
    export let name: string;
    export let exists: boolean;
</script>

<div>
    {#if name}
        <label>
            Image:
            <pre><code>{name}</code></pre>
        </label>
        {#if exists}
            <span>&#10004;</span>
        {:else}
            <span>&#10060;</span>
        {/if}
    {/if}
</div>
