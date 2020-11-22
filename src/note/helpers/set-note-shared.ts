import {Connection} from 'mysql';
import {NoteId, UserId} from '../../base-types';
import {query} from '../../database';

export async function setNoteShared(noteId: NoteId, userId: UserId, db: Connection) {
    await query(`
        UPDATE note
        SET shared = 1
        WHERE
            note_id = ?
            AND user_id = ?
    `, [
        noteId,
        userId,
    ], db);
}
