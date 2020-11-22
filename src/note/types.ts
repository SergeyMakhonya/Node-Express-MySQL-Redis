import {CountPerPage, NoteId, NoteText, SharedItemHash, Timestamp} from "../base-types";

export namespace INotesServer {
    export namespace INote {
        export interface InAction {
            find?: InAction.Find;
            get?: InAction.Get;
            create?: InAction.Create;
            update?: InAction.Update;
            remove?: InAction.Remove;
            share?: InAction.Share;
        }

        export namespace InAction {
            export interface Find {
                cursor?: NoteId;
                count?: CountPerPage;
            }
            export interface Get {
                noteId: NoteId;
            }
            export interface Create {
                text: NoteText;
            }
            export interface Update {
                noteId: NoteId;
                text: NoteText;
            }
            export interface Remove {
                noteId: NoteId;
            }
            export interface Share {
                noteId: NoteId;
            }
        }
        
        export interface OutAction {
            find?: OutAction.Find;
            get?: OutAction.Get;
            create?: OutAction.Create;
            update?: OutAction.Update;
            remove?: OutAction.Remove;
        }

        export namespace OutAction {
            export type Find = NoteItem[];
            export type Get = NoteItem;
            export type Create = Get;
            export type Update = Get;
            export interface Remove {}
            export interface Share {
                hash: SharedItemHash;
            }
        }
    }
}

export interface NoteItem {
    id: NoteId;
    text: NoteText;
    shared: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
