<script lang="ts">
    // Library imports
    import { tick } from 'svelte';
    // Absolute project imports
    import type { Package } from '$lib/mulled';

    export let pkg: Package;
    export let index: number;
    export let isLast = false;
    export let canRemove = false;
    export let addPackage: CallableFunction;
    export let removePackage: CallableFunction;

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
        Name
        <input type="text" bind:value={name} />
    </label>
    <label>
        Version
        <input type="text" placeholder="Optional" bind:value={version} />
    </label>
    <label>
        Build
        <input type="text" placeholder="Optional" bind:value={build} />
    </label>
    {#if canRemove}
        <button on:click|preventDefault={() => removePackage(index)}>Remove</button>
    {/if}
</div>
