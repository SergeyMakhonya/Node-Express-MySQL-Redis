import {createUser} from '../../user/helpers';
import {checkUsername} from '../../user/helpers/check-username';
import {HttpError} from '../../utils/http-error';
import {INotesServer} from '../types';

type In = INotesServer.IAuth.InAction.Signup;
type Out = INotesServer.IAuth.OutAction.Signup;

export async function signup({username, password, passwordConfirm}: In): Promise<Out> {
    if (password !== passwordConfirm) {
        throw new HttpError(400, 'passwords not match', username);
    }
    
    const usernameExists = await checkUsername(username);

    if (usernameExists) {
        throw new HttpError(500, 'username exists', username);
    }

    await createUser({
        username,
        password,
    });

    return {};
}
