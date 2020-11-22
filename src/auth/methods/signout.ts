import {UserId} from '../../base-types';
import {jwtDestroyAll} from '../../utils/jwt';
import {INotesServer} from '../types';

type Out = INotesServer.IAuth.OutAction.Signout;

export async function signout(userId: UserId): Promise<Out> {
    jwtDestroyAll(userId);

    return {};
}
