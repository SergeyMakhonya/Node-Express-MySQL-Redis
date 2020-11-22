import {Connection} from 'mysql';
import {UserId} from '../../base-types';
import {createTransactionFunc, queryOkPacket} from '../../database';
import {HttpError} from '../../utils/http-error';
import {INotesServer} from '../types';

type In = INotesServer.INote.InAction.Remove;
type Out = INotesServer.INote.OutAction.Remove;

export const remove = createTransactionFunc(removeFunc);

async function removeFunc(db: Connection, {noteId}: In, userId: UserId): Promise<Out> {
    const okPacket = await queryOkPacket(`
        DELETE FROM note
        WHERE
            note_id = ?
            AND user_id = ?
    `, [
        noteId,
        userId,
    ], db);

    if (!okPacket.affectedRows) {
        throw new HttpError(404, 'note item not found');
    }

    return {};
}