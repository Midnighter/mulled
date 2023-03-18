<script lang="ts">
    export let hashLine: string;
    export let submit: CallableFunction;
</script>

<div>
    <label>
        Paste Line
        <input bind:value={hashLine} />
    </label>
    <button on:click={submit}>Submit</button>
</div>
