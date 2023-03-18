<script lang="ts">
    import type { IPackage } from '$lib/mulled';

    export let packages: IPackage[];
    export let imageBuild: string;
    export let addPackage: CallableFunction;
    export let removePackage: CallableFunction;
    export let submit: CallableFunction;
</script>

<h2>Assemble Image Information</h2>

<div>
    <label>
        Image Build Number
        <input placeholder="Optional" bind:value={imageBuild} />
    </label>
</div>

<div>
    {#each packages as pkg, idx (idx)}
        <div>
            <label>
                Name
                <input bind:value={pkg.name} />
            </label>
            <label>
                Version
                <input placeholder="Optional" bind:value={pkg.version} />
            </label>
            <label>
                Build
                <input placeholder="Optional" bind:value={pkg.build} />
            </label>
            {#if idx > 0}
                <button on:click={() => removePackage(idx)}>Remove</button>
            {/if}
            {#if idx == packages.length - 1}
                <button on:click={addPackage}>Add</button>
            {/if}
        </div>
    {/each}
    <button on:click={submit}>Submit</button>
</div>
