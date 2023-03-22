<script lang="ts">
    import type { ITheme } from '$lib/theme';

    export let theme: ITheme;
    export let hashLine: string;
</script>

<div>
    <h3>Multi-Package Line</h3>
    <label>
        Paste:
        <input
            type="text"
            bind:value={hashLine}
            style="background-color: {theme.backHighlight}; color: {theme.fontHighlight};"
        />
    </label>
</div>

<style>
    input {
        width: 55%;
    }
</style>
