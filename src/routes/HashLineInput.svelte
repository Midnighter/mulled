<script lang="ts">
    export let hashLine: string;
</script>

<div>
    <h3>Multi-Package Line</h3>
    <label>
        Paste:
        <input type="text" bind:value={hashLine} />
    </label>
</div>

<style>
    input {
        width: 55%;
    }
</style>
