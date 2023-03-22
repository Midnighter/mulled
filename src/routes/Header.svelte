<script lang="ts">
    import type { ITheme } from '$lib/theme';

    export let theme: ITheme;
    export let isDark: boolean;
    export let toggleTheme: CallableFunction;

    let symbol: string;

    $: if (isDark) {
        symbol = '&#9728;';
    } else {
        symbol = '&#9789;';
    }
</script>

<div style="background-color: {theme.backgroundColor}; color: {theme.fontColor};">
    <h1>Multi-Package BioContainers Image Name Generator</h1>
    <button
        id="themeToggle"
        on:click|preventDefault={toggleTheme}
        style="color: {theme.fontColor};">{@html symbol}</button
    >
</div>

<style>
    div {
        width: 100%;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
            drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
        padding: 0.25rem;
        margin-bottom: 1rem;
        text-align: center;
    }
    #themeToggle {
        border: 0;
        background-color: transparent;
        cursor: pointer;
    }
</style>
