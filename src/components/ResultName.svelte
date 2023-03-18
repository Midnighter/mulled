<script lang="ts">
    export let name: string;
    export let reset: CallableFunction;
</script>

<pre><code>{name}</code></pre>
<button on:click={reset}>Reset</button>
