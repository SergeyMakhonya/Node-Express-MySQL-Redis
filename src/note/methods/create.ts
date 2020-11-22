import {Connection} from 'mysql';
import {UserId} from '../../base-types';
import {createTransactionFunc, queryOkPacket} from '../../database';
import {INotesServer} from '../types';
import {get} from './get';

type In = INotesServer.INote.InAction.Create;
type Out = INotesServer.INote.OutAction.Create;

export const create = createTransactionFunc(createFunc);

async function createFunc(db: Connection, {text}: In, userId: UserId): Promise<Out> {
    const okPacket = await queryOkPacket(`
        INSERT INTO note (user_id, text)
        VALUES (?, ?)
    `, [
        userId,
        text,
    ], db);
    
    return await get({
        noteId: okPacket.insertId,
    }, userId, db);
} 