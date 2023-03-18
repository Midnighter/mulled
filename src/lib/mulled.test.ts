import { describe, it, expect } from 'vitest';
import { hexDigest, MultiPackageV2ImageService } from '$lib/mulled';

describe('hexDigest', () => {
    it('hashes chromap, samtools', () => {
        expect(hexDigest(['chromap', 'samtools'].join('\n'))).toBe(
            '1f09f39f20b1c4ee36581dc81cc323c70e661633'
        );
    });

    it('hashes 0.2.1, 1.15', () => {
        expect(hexDigest(['0.2.1', '1.15'].join('\n'))).toBe(
            'bd74d08a359024829a7aec1638a28607bbcd8a58'
        );
    });

    it('hashes chromap, samtools', () => {
        expect(hexDigest(['biopython', 'pysam'].join('\n'))).toBe(
            '3a59640f3fe1ed11819984087d31d68600200c3f'
        );
    });
});

describe('MultiPackageV2ImageService', () => {
    it('generates a correct hash', () => {
        expect(
            MultiPackageV2ImageService.fromPackages(
                [
                    { name: 'samclip', version: '0.4.0', build: '' },
                    { name: 'samtools', version: '1.15', build: '' }
                ],
                '0'
            )?.toString()
        ).toBe(
            'mulled-v2-d057255d4027721f3ab57f6a599a2ae81cb3cbe3:13051b049b6ae536d76031ba94a0b8e78e364815-0'
        );
    });
});
