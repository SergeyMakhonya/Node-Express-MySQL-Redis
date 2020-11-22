import {SharedItemHash, SharedItemType} from "../base-types";
import {NoteItem} from "../note/types";

export namespace INotesServer {
    export namespace IShare {
        export interface InAction {
            get?: InAction.Get;
        }

        export namespace InAction {
            export interface Get {
                hash: SharedItemHash;
            }
        }
        
        export interface OutAction {
            get?: OutAction.Get;
        }

        export namespace OutAction {
            export type Get = SharedItem;
        }
    }
}

export interface SharedItem {
    itemType: SharedItemType;
    data: SharedItemData;
}

export type SharedItemData = NoteItem; // NoteItem | OtherItem;
