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
    let exists = false;

    function addPackage() {
        packages = [...packages, { name: '', version: '', build: '' } as IPackage];
    }

    function removePackage(index: number) {
        packages.splice(index, 1);
        packages = packages;
    }

    function reset() {
        name = '';
        hashLine = '';
        packages = [{ name: '', version: '', build: '' } as IPackage];
    }

    $: if (hashLine) {
        name = MultiPackageV2ImageService.parseLine(hashLine);
    } else {
        name = MultiPackageV2ImageService.fromPackages(packages, imageBuild);
    }
</script>

<Header />

<ResultName {name} {exists} />

<Description />
<HashLineInput bind:hashLine />
<AssembleImage bind:packages bind:imageBuild {addPackage} {removePackage} />
<button on:click|preventDefault={() => reset()}>Reset</button>
