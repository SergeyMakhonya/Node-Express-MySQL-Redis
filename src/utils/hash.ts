import Hashids from 'hashids'
import {config} from '../config';

const hashids = new Hashids(config.hashSalt, 15);

export function encodeHash(value: number): string {
    return hashids.encode(value);
}

export function decodeHash(hash: string): number | undefined {
    return hashids.decode(hash)[0] as number;
}
