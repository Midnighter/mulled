<script lang="ts">
    import {
        MultiPackageV2ImageService,
        TargetPackage,
        type IPackage
    } from '$lib/mulled';
    import Header from '$components/Header.svelte';
    import ResultName from '$components/ResultName.svelte';
    import Description from '$components/Description.svelte';
    import HashLineInput from '$components/HashLineInput.svelte';
    import AssembleImage from '$components/AssembleImage.svelte';
    import ErrorMessage from '$components/ErrorMessage.svelte';

    let hashLine = '';
    let imageBuild = '0';
    let packages: IPackage[] = [{ name: '', version: '', build: '' } as IPackage];
    let name = '';
    let hasError = false;

    function addPackage() {
        packages = [...packages, { name: '', version: '', build: '' } as IPackage];
    }

    function removePackage(index: number) {
        packages.splice(index, 1);
        packages = packages;
    }

    function submit() {
        if (hashLine) {
            name = MultiPackageV2ImageService.parseLine(hashLine);
        } else {
            name = MultiPackageV2ImageService.fromPackages(packages, imageBuild);
        }
        if (!name) {
            hasError = true;
        }
    }

    function reset() {
        name = '';
        hashLine = '';
        packages = [{ name: '', version: '', build: '' } as IPackage];
        hasError = false;
    }

    function closeError() {
        hasError = false;
    }
</script>

<Header />

{#if name}
    <ResultName {name} {reset} />
{:else}
    {#if hasError}
        <ErrorMessage {closeError} />
    {/if}
    <Description />
    <HashLineInput bind:hashLine {submit} />
    <AssembleImage
        bind:packages
        bind:imageBuild
        {addPackage}
        {removePackage}
        {submit}
    />
{/if}
