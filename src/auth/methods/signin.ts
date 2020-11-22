import {Connection} from 'mysql';
import {INotesServer} from '../types';
import {getUserId} from '../../user/helpers';
import {JwtPayload, jwtSign} from '../../utils/jwt';
import {HttpError} from '../../utils/http-error';

type In = INotesServer.IAuth.InAction.Signin;
type Out = INotesServer.IAuth.OutAction.Signin;

export async function signin({username, password}: In, db?: Connection): Promise<Out> {
    const userId = await getUserId(username, password, db);

    if (!userId) {
        throw new HttpError(500, 'user not found', username);
    }

    const jwtPayload: JwtPayload = {
        userId,
    };

    const token = jwtSign(jwtPayload);

    return {
        token,
    };
}
