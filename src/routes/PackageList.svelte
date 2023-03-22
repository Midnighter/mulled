<script lang="ts">
    // Absolute project imports
    import type { Package } from '$lib/mulled';
    import type { ITheme } from '$lib/theme';
    // Relative project imports
    import PackageInput from './PackageInput.svelte';

    export let packages: Package[];
    export let imageBuild: string;
    export let addPackage: CallableFunction;
    export let removePackage: CallableFunction;
    export let theme: ITheme;
</script>

<h3>Package List</h3>

<div class="list-wrapper">
    <div>
        <label>
            Image Build Number:
            <input
                type="number"
                min="0"
                placeholder="Optional"
                bind:value={imageBuild}
                style="background-color: {theme.backHighlight}; color: {theme.fontHighlight};"
            />
        </label>
    </div>

    {#each packages as pkg, idx (pkg.id)}
        <PackageInput
            bind:pkg
            index={idx}
            isLast={idx === packages.length - 1}
            canRemove={idx > 0}
            {addPackage}
            {removePackage}
            {theme}
        />
    {/each}
</div>

<style>
    .list-wrapper {
        display: flex;
        flex-direction: column;
    }
    .list-wrapper > :global(*) {
        margin-top: 0.5rem;
        flex: 0 1 auto;
    }
</style>
