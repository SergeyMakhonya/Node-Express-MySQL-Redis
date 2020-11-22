import {Connection} from 'mysql';
import {SharedItemId} from '../../base-types';
import {query} from '../../database';
import {HttpError} from '../../utils/http-error';

export interface SharedItemDB {
    itemType: string;
    itemId: number;
}

export async function getSharedItem(sharedItemId: SharedItemId, db: Connection): Promise<SharedItemDB> {
    const result = await query<SharedItemDB>(`
        SELECT
            item_type as itemType,
            item_id as itemId
        FROM
            shared_item
        WHERE
            shared_item_id = ?
    `, [
        sharedItemId,
    ], db);

    if (!result.length) {
        throw new HttpError(404, 'shared item not found');
    }

    return result[0];
}