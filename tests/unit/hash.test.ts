import {expect} from 'chai';
import {decodeHash, encodeHash} from '../../src/utils/hash';

describe('hash', () => {
    it('encode & decode', () => {
        const encoded = encodeHash(15);
        const decoded = decodeHash(encoded);

        expect(decoded).to.equal(15);
    });
});
