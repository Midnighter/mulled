<script lang="ts">
    export let hashLine: string;

    let value = hashLine;

    $: hashLine = value.trim();
</script>

<div>
    <h3>Multi-Package Line</h3>
    <label>
        Paste:
        <input type="text" bind:value />
    </label>
</div>
