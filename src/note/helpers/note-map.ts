import {NoteItem} from '../types';

export const noteMap = (item: any): NoteItem => ({
    ...item,
    shared: !!item.shared,
});
