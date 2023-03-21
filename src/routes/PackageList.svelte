<script lang="ts">
    // Absolute project imports
    import type { Package } from '$lib/mulled';
    // Relative project imports
    import PackageInput from './PackageInput.svelte';

    export let packages: Package[];
    export let imageBuild: string;
    export let addPackage: CallableFunction;
    export let removePackage: CallableFunction;
</script>

<h3>Package List</h3>

<div>
    <label>
        Image Build Number
        <input type="number" min="0" placeholder="Optional" bind:value={imageBuild} />
    </label>
</div>

<div>
    {#each packages as pkg, idx (pkg.id)}
        <PackageInput
            bind:pkg
            index={idx}
            isLast={idx === packages.length - 1}
            canRemove={idx > 0}
            {addPackage}
            {removePackage}
        />
    {/each}
</div>
