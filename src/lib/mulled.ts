import sha1 from 'crypto-js/sha1';

export interface IPackage {
    name: string;
    version: string;
    build: string;
}

export class Package implements IPackage {
    readonly id: number;
    name: string;
    version: string;
    build: string;

    private static counter = 0;

    constructor(name: string, version = '', build = '') {
        this.id = Package.counter;
        Package.counter += 1;
        this.name = name;
        this.version = version;
        this.build = build;
    }
}

export class TargetPackage implements IPackage {
    readonly name: string;
    readonly version: string;
    readonly build: string;
    readonly package: string;

    constructor(name: string, version = '', build = '') {
        this.name = name.toLowerCase();
        this.package = name;
        this.version = version;
        this.build = build;
    }
}

export class MultiPackageV2Image {
    readonly name: string;
    readonly tag: string;

    constructor(name: string, tag: string) {
        this.name = name;
        this.tag = tag;
    }

    toString(): string {
        if (this.tag) {
            return `${this.name}:${this.tag}`;
        } else {
            return this.name;
        }
    }
}

export function hexDigest(message: string): string {
    const digest = sha1(message);
    return digest.toString();
}

export class MultiPackageV2ImageService {
    static parseLine(line: string): MultiPackageV2Image | null {
        const [packages, baseImage, imageBuild] = line.split('\t');
        const targets = packages
            .split(',')
            .map(
                (token) =>
                    new TargetPackage(
                        ...(token.split('=') as [string, string?, string?])
                    )
            );
        return this.generateName(targets, imageBuild);
    }

    static fromPackages(
        packages: IPackage[],
        imageBuild: string
    ): MultiPackageV2Image | null {
        return this.generateName(
            packages
                // Keep only packages with a name attribute.
                .filter((pkg) => !!pkg.name)
                .map((pkg) => new TargetPackage(pkg.name, pkg.version, pkg.build)),
            imageBuild
        );
    }

    private static generateName(
        targets: TargetPackage[],
        imageBuild = ''
    ): MultiPackageV2Image | null {
        if (targets.length === 0) return null; // bail
        if (targets.length === 1) {
            return this.simpleName(targets[0], imageBuild);
        }
        targets.sort((left, right) => left.name.localeCompare(right.name));
        const packageDigest = hexDigest(targets.map((trgt) => trgt.name).join('\n'));
        if (targets.some((trgt) => trgt.version)) {
            const versionDigest = hexDigest(
                targets.map((trgt) => trgt.version || 'null').join('\n')
            );
            if (imageBuild) {
                return new MultiPackageV2Image(
                    `mulled-v2-${packageDigest}`,
                    `${versionDigest}-${imageBuild}`
                );
            } else {
                return new MultiPackageV2Image(
                    `mulled-v2-${packageDigest}`,
                    versionDigest
                );
            }
        } else {
            if (imageBuild) {
                return new MultiPackageV2Image(
                    `mulled-v2-${packageDigest}`,
                    imageBuild
                );
            } else {
                return new MultiPackageV2Image(`mulled-v2-${packageDigest}`, '');
            }
        }
    }

    private static simpleName(
        target: TargetPackage,
        imageBuild: string
    ): MultiPackageV2Image {
        if (!target.version) {
            return new MultiPackageV2Image(target.name, '');
        } else if (!target.build) {
            if (!imageBuild || imageBuild === '0') {
                return new MultiPackageV2Image(target.name, target.version);
            } else {
                return new MultiPackageV2Image(
                    target.name,
                    `${target.version}--${imageBuild}`
                );
            }
        } else {
            return new MultiPackageV2Image(
                target.name,
                `${target.version}--${target.build}`
            );
        }
    }
}
