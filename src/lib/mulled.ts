import sha1 from 'crypto-js/sha1';

export interface IPackage {
    name: string;
    version: string;
    build: string;
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

export function hexDigest(message: string): string {
    const digest = sha1(message);
    return digest.toString();
}

export class MultiPackageV2ImageService {
    static parseLine(line: string): string {
        const [packages, baseImage, imageBuild] = line.split('\t');
        const targets = packages
            .split(',')
            .map((token) => new TargetPackage(...token.split('=')));
        return this.generateName(targets, imageBuild);
    }

    static fromPackages(packages: IPackage[], imageBuild: string): string {
        return this.generateName(
            packages
                // Remove packages without any defined attributes.
                .filter((pkg) => Object.values(pkg).some((val) => val !== ''))
                .map((pkg) => new TargetPackage(pkg.name, pkg.version, pkg.build)),
            imageBuild
        );
    }

    private static generateName(targets: TargetPackage[], imageBuild = ''): string {
        if (targets.length === 0) return ''; // bail
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
                return `mulled-v2-${packageDigest}:${versionDigest}-${imageBuild}`;
            } else {
                return `mulled-v2-${packageDigest}:${versionDigest}`;
            }
        } else {
            if (imageBuild) {
                return `mulled-v2-${packageDigest}:${imageBuild}`;
            } else {
                return `mulled-v2-${packageDigest}`;
            }
        }
    }

    private static simpleName(target: TargetPackage, imageBuild: string): string {
        if (!target.version) {
            return target.name;
        } else if (!target.build) {
            if (!imageBuild || imageBuild === '0') {
                return `${target.name}:${target.version}`;
            } else {
                return `${target.name}:${target.version}--${imageBuild}`;
            }
        } else {
            return `${target.name}:${target.version}--${target.build}`;
        }
    }
}
