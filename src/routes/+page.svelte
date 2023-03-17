<script lang="ts">
    import { TargetPackage } from '$lib/mulled';

    let packages = [new TargetPackage()];

    function addTarget() {
        packages = [...packages, new TargetPackage()];
    }

    function removeTarget(index: number) {
        packages.splice(index, 1);
        packages = packages;
    }
</script>

<h1>Mulled BioContainers Name Generator</h1>

{#each packages as pkg, idx (idx)}
    <div>
        <input placeholder="Name" bind:value={pkg.name} />
        <input placeholder="Version" bind:value={pkg.version} />
        {#if idx > 0}
            <button on:click={() => removeTarget(idx)}>Remove</button>
        {/if}
        {#if idx == packages.length - 1}
            <button on:click={addTarget}>Add</button>
        {/if}
    </div>
{/each}
