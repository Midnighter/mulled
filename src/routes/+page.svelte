<script lang="ts">
    import {
        MultiPackageV2Image,
        MultiPackageV2ImageService,
        TargetPackage,
        type IPackage
    } from '$lib/mulled';
    import { PUBLIC_QUAY_API } from '$env/static/public';
    import Header from '$components/Header.svelte';
    import ResultName from '$components/ResultName.svelte';
    import Description from '$components/Description.svelte';
    import HashLineInput from '$components/HashLineInput.svelte';
    import AssembleImage from '$components/AssembleImage.svelte';

    let hashLine = '';
    let imageBuild = '0';
    let packages: IPackage[] = [{ name: '', version: '', build: '' } as IPackage];
    let image: MultiPackageV2Image | null = null;
    let exists: boolean | null = null;
    let timer: ReturnType<typeof setTimeout>;

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
                            `Image ${image!.name} not found in biocontainers.`
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
        }, 500);
    }

    function addPackage() {
        // Assignment is needed for reactivity.
        packages = [...packages, { name: '', version: '', build: '' } as IPackage];
    }

    function removePackage(index: number) {
        packages.splice(index, 1);
        // Assignment is needed for reactivity.
        packages = packages;
    }

    function reset() {
        hashLine = '';
        image = null;
        exists = null;
        // Assignment is needed for reactivity.
        packages = [{ name: '', version: '', build: '' } as IPackage];
    }

    $: if (hashLine) {
        image = MultiPackageV2ImageService.parseLine(hashLine);
    } else {
        image = MultiPackageV2ImageService.fromPackages(packages, imageBuild);
    }

    $: if (image) {
        checkImageExistance();
    }
</script>

<Header />

<ResultName {image} {exists} />

<Description />
<HashLineInput bind:hashLine />
<AssembleImage bind:packages bind:imageBuild {addPackage} {removePackage} />
<button on:click|preventDefault={() => reset()}>Reset</button>
