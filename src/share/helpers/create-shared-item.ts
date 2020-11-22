import {Connection} from 'mysql';
import {Id, SharedItemId, SharedItemType} from '../../base-types';
import {queryOkPacket} from '../../database';
import {HttpError} from '../../utils/http-error';

export async function createSharedItem(itemId: Id, itemType: SharedItemType, db: Connection): Promise<SharedItemId> {
    const okPacket = await queryOkPacket(`
        INSERT INTO shared_item (item_id, item_type)
        VALUES (?, ?)
    `, [
        itemId,
        itemType,
    ], db);

    if (!okPacket.affectedRows) {
        throw new HttpError(500, 'no entry has been added to the "shared_item" table');
    }

    return okPacket.insertId;
}
