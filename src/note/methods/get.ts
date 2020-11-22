import {Connection} from 'mysql';
import {UserId} from '../../base-types';
import {query} from '../../database';
import {HttpError} from '../../utils/http-error';
import {noteMap} from '../helpers';
import {INotesServer, NoteItem} from '../types';

type In = INotesServer.INote.InAction.Get;
type Out = INotesServer.INote.OutAction.Get;

export async function get(inParams: In, userId: UserId, db?: Connection): Promise<Out> {
    const result = await query<NoteItem>(`
        SELECT
            note_id as noteId,
            user_id as userId,
            text,
            shared,
            UNIX_TIMESTAMP(created_at) * 1000 as createdAt,
            UNIX_TIMESTAMP(updated_at) * 1000 as updatedAt
        FROM
            note
        WHERE
            note_id = ?
            AND (
                user_id = ?
                OR (? IS NULL AND shared = 1)
            )
    `, [
        inParams.noteId,
        userId,
        userId,
    ], db);

    if (!result.length) {
        throw new HttpError(404, 'note item not found')
    }

    return noteMap(result[0]);
} 