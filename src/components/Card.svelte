<script lang="ts">
    import type { ITheme } from '$lib/theme';

    export let theme: ITheme;
    export let header: string;
</script>

<div
    class="card"
    style="background-color: {theme.backgroundColor}; color: {theme.fontColor};"
>
    <h2>{header}</h2>
    <slot />
</div>

<style>
    .card {
        border-radius: 0.5rem;
        filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
            drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
        padding: 1rem;
        line-height: 1.5rem;
        margin-bottom: 1rem;
        min-width: 50rem;
        width: 60%;
    }
</style>
