import {Connection} from 'mysql';
import {UserId} from '../../base-types';
import {createTransactionFunc, query} from '../../database';
import {INotesServer} from '../types';
import {get} from './get';

type In = INotesServer.INote.InAction.Update;
type Out = INotesServer.INote.OutAction.Update;

export const update = createTransactionFunc(updateFunc);

async function updateFunc(db: Connection, {noteId, text}: In, userId: UserId): Promise<Out> {
    await query(`
        UPDATE note
        SET text = ?
        WHERE
            note_id = ?
            AND user_id = ?
    `, [
        text,
        noteId,
        userId,
    ], db);
    
    return await get({
        noteId,
    }, userId, db);
}