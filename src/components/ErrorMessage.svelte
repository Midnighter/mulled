<script lang="ts">
    export let closeError: CallableFunction;
</script>

<div class="error">
    <p>Missing information for generating an image name!</p>
    <button on:click={closeError}>X</button>
</div>

<style>
    .error {
        background: darkred;
    }
</style>
