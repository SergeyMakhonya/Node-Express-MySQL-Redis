import {Connection} from 'mysql';
import {decodeHash} from '../../utils/hash';
import {HttpError} from '../../utils/http-error';
import {INotesServer, SharedItemData} from '../types';
import {get as getNote} from '../../note/methods/get';
import {SharedItemId} from '../../base-types';
import {getSharedItem} from '../helpers/get-shared-item';

type In = INotesServer.IShare.InAction.Get;
type Out = INotesServer.IShare.OutAction.Get;

export async function get({hash}: In, db?: Connection): Promise<Out> {
    const sharedItemId: SharedItemId = decodeHash(hash);

    if (!sharedItemId) {
        throw new HttpError(400, 'invalid hash');
    }

    const {itemId, itemType} = await getSharedItem(sharedItemId, db);

    let data: SharedItemData;

    switch (itemType) {
        case 'note':
            data = await getNote({ noteId: itemId }, null, db);
            break;

        default:
            throw new HttpError(404, 'unknown shared item type', {itemType});
    }

    if (!data) {
        throw new HttpError(404, 'shared item data not found');
    }

    return {
        itemType,
        data,
    };
}