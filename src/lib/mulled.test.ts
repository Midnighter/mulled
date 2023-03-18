import { describe, it, expect } from 'vitest';
import { hexDigest } from '$lib/mulled';

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
