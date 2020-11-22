import {Connection} from 'mysql';
import {Id, SharedItemId, SharedItemType} from '../../base-types';
import {query} from '../../database';
import {HttpError} from '../../utils/http-error';

export async function getSharedItemId(itemId: Id, itemType: SharedItemType, db: Connection): Promise<SharedItemId> {
    const result = await query<{sharedItemId: number}>(`
        SELECT
            shared_item_id as sharedItemId
        FROM
            shared_item
        WHERE
            item_id = ?
            AND item_type = ?
    `, [
        itemId,
        itemType,
    ], db);

    if (!result.length) {
        throw new HttpError(404, 'shared item not found');
    }

    return result[0].sharedItemId;
}
