<script lang="ts">
    // Absolute project imports
    import {
        MultiPackageV2Image,
        MultiPackageV2ImageBuilder,
        TargetPackage,
        Package
    } from '$lib/mulled';
    import { dark, light } from '$lib/theme';
    import { PUBLIC_QUAY_API } from '$env/static/public';
    import Card from '$components/Card.svelte';
    // Relative project imports
    import Header from './Header.svelte';
    import ResultName from './ResultName.svelte';
    import Description from './Description.svelte';
    import HashLineInput from './HashLineInput.svelte';
    import PackageList from './PackageList.svelte';

    let isDark = true;
    let hashLine = '';
    let imageBuild = '0';
    let packages: Package[] = [new Package('')];
    let image: MultiPackageV2Image | null = null;
    let exists: boolean | null = null;
    let timer: ReturnType<typeof setTimeout>;

    function toggleTheme() {
        isDark = !isDark;
    }

    function checkImageExistance() {
        exists = null;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fetch(
                `${PUBLIC_QUAY_API}/${image!.name}?${new URLSearchParams({
                    includeTags: 'true'
                })}`,
                {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `Image ${
                                image!.name
                            } not found in BioContainers organization.`
                        );
                    }
                    return response.json();
                })
                .then((result) => {
                    exists = image!.tag in result['tags'];
                })
                .catch((reason) => {
                    console.debug(reason);
                    exists = false;
                });
        }, 250);
    }

    function addPackage() {
        // Assignment is needed for reactivity.
        packages = [...packages, new Package('')];
    }

    function removePackage(index: number) {
        packages.splice(index, 1);
        // Assignment is needed for reactivity.
        packages = packages;
    }

    function resetInfo() {
        hashLine = '';
        image = null;
        exists = null;
        // Assignment is needed for reactivity.
        packages = [new Package('')];
    }

    $: if (hashLine) {
        image = MultiPackageV2ImageBuilder.parseLine(hashLine.trim());
    } else {
        image = MultiPackageV2ImageBuilder.fromPackages(packages, imageBuild);
    }

    $: if (image) {
        checkImageExistance();
    }
</script>

<Header {isDark} theme={isDark ? dark : light} {toggleTheme} />

<div id="content">
    <Card header="About" theme={isDark ? dark : light}>
        <Description />
    </Card>
    <Card header="Generated Name" theme={isDark ? dark : light}>
        <ResultName {image} {exists} theme={isDark ? dark : light} />
    </Card>
    <Card header="Define Image" theme={isDark ? dark : light}>
        <HashLineInput bind:hashLine theme={isDark ? dark : light} />
        <PackageList
            bind:packages
            bind:imageBuild
            {addPackage}
            {removePackage}
            theme={isDark ? dark : light}
        />
        <button id="reset" on:click|preventDefault={resetInfo}>Reset</button>
    </Card>
</div>

<style>
    :global(:root) {
        --base03: rgb(0, 43, 54);
        --base02: rgb(7, 54, 66);
        --base01: rgb(88, 110, 117);
        --base00: rgb(101, 123, 131);
        --base0: rgb(131, 148, 150);
        --base1: rgb(147, 161, 161);
        --base2: rgb(238, 232, 213);
        --base3: rgb(253, 246, 227);
        --green: rgb(133, 153, 0);
    }
    :global(body) {
        background-color: var(--base1);
        margin: 0;
    }
    :global(a) {
        color: var(--green);
    }
    :global(input) {
        border-radius: 0.25rem;
    }
    :global(::placeholder) {
        color: var(--base01);
    }
    :global(button) {
        border-radius: 0.25rem;
    }
    #content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #reset {
        margin-top: 1.5rem;
    }
</style>
