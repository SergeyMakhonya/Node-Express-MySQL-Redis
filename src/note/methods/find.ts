import {UserId} from '../../base-types';
import {query} from '../../database';
import {noteMap} from '../helpers';
import {INotesServer, NoteItem} from '../types';

type In = INotesServer.INote.InAction.Find;
type Out = INotesServer.INote.OutAction.Find;

export async function find(inParams: In, userId: UserId): Promise<Out> {
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
            user_id = ?
            AND note_id > ?
        ORDER BY
            note_id ASC
        LIMIT ?
    `, [
        userId,
        inParams.cursor,
        inParams.count
    ]);

    return result.map(noteMap);
}