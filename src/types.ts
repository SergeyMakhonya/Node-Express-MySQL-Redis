import * as healthCheck from './health-check/types';
import * as note from './note/types';
import * as share from './share/types';
import * as auth from './auth/types';

export namespace INotesServer {
    export import IHealthCheck = healthCheck.INotesServer.IHealthCheck;
    export import INote = note.INotesServer.INote;
    export import IShare = share.INotesServer.IShare;
    export import IAuth = auth.INotesServer.IAuth;

    export interface InAction {
        healthCheck?: IHealthCheck.InAction;
        note?: INote.InAction;
        share?: IShare.InAction;
        auth?: IAuth.InAction;
    }

    export interface OutAction {
        healthCheck?: IHealthCheck.OutAction;
        note?: INote.OutAction;
        share?: IShare.OutAction;
        auth?: IAuth.OutAction;
    }
}
