<p>
    <a href="https://github.com/BioContainers/multi-package-containers/"
        >Multi-Package BioContainers</a
    > allow you to combine multiple conda packages into one container image. If you know
    a specific package combination that you need but you don't know the name of the resulting
    image, then this service is for you.
</p>

<p>
    You can either paste a line from the <a
        href="https://github.com/BioContainers/multi-package-containers/blob/master/combinations/hash.tsv"
        >hash.tsv</a
    > file that tracks already built multi-package containers or fill in the information
    below. Pasting in content takes precedence over the filled in information. The order
    of packages doesn't matter since they will be sorted by name.
</p>

<p>
    Once you start adding information, an image name will be generated and shown below.
    That name will also be checked on <a href="https://quay.io">Quay.io</a> to see if
    such an image exists in the
    <a href="https://quay.io/organization/biocontainers">BioContainers organization</a>.
    If the image exists, you should see a &#10004; appear after a moment, otherwise
    there will be a &#10060;.
</p>
