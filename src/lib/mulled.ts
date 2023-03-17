export class TargetPackage {
    name: string;
    version: string;

    constructor(name = '', version = '') {
        this.name = name;
        this.version = version;
    }
}
