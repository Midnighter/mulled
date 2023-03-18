<script lang="ts">
    export let name: string;
    export let reset: CallableFunction;
</script>

<pre><code>{name}</code></pre>
<button on:click|preventDefault={() => reset()}>Reset</button>
