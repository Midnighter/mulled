<script lang="ts">
    // Absolute project imports
    import type { Package } from '$lib/mulled';
    import type { ITheme } from '$lib/theme';

    export let pkg: Package;
    export let index: number;
    export let isLast = false;
    export let canRemove = false;
    export let addPackage: CallableFunction;
    export let removePackage: CallableFunction;
    export let theme: ITheme;

    let name = pkg.name;
    let version = pkg.version;
    let build = pkg.build;

    $: {
        // Assignment is needed for reactivity.
        pkg = {
            ...pkg,
            name: name.trim(),
            version: version.trim(),
            build: build.trim()
        } as Package;
    }

    $: if (isLast && name) {
        addPackage();
    }
</script>

<div>
    <label>
        Name:
        <input
            type="text"
            bind:value={name}
            style="background-color: {theme.backHighlight}; color: {theme.fontHighlight};"
        />
    </label>
    <label>
        Version:
        <input
            type="text"
            placeholder="Optional"
            bind:value={version}
            style="background-color: {theme.backHighlight}; color: {theme.fontHighlight};"
        />
    </label>
    <label>
        Build:
        <input
            type="text"
            placeholder="Optional"
            bind:value={build}
            style="background-color: {theme.backHighlight}; color: {theme.fontHighlight};"
        />
    </label>
    {#if canRemove}
        <button on:click|preventDefault={() => removePackage(index)}>Remove</button>
    {/if}
</div>

<style>
    div > :global(label) {
        margin-left: 0.5rem;
    }
    div > :first-child {
        margin-left: 0;
    }
</style>
