import {Connection} from 'mysql';
import {Id, SharedItemHash, SharedItemType} from '../../base-types';
import {encodeHash} from '../../utils/hash';
import {getSharedItemId} from './get-shared-item-id';

export async function getSharedItemHash(itemId: Id, itemType: SharedItemType, db: Connection): Promise<SharedItemHash> {
    const sharedItemId = await getSharedItemId(itemId, itemType, db);
    return encodeHash(sharedItemId);
}
