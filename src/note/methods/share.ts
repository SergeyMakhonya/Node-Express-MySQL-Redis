import {Connection} from 'mysql';
import {UserId} from '../../base-types';
import {createTransactionFunc} from '../../database';
import {createSharedItem, getSharedItemHash} from '../../share/helpers';
import {encodeHash} from '../../utils/hash';
import {setNoteShared} from '../helpers';
import {INotesServer} from '../types';
import {get} from './get';

type In = INotesServer.INote.InAction.Share;
type Out = INotesServer.INote.OutAction.Share;

export const share = createTransactionFunc(shareFunc);

async function shareFunc(db: Connection, {noteId}: In, userId: UserId): Promise<Out> {
    const note = await get({noteId}, userId, db);
    
    if (note.shared) {
        const hash = await getSharedItemHash(noteId, 'note', db);
        return { hash };
    }

    await setNoteShared(noteId, userId, db);

    const sharedItemId = await createSharedItem(noteId, 'note', db);
    const hash = encodeHash(sharedItemId);

    return { hash };
}
