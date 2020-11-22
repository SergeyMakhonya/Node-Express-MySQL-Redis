import {Connection} from 'mysql';
import {UserName, UserPassword} from '../../base-types';
import {createTransactionFunc, queryOkPacket} from '../../database';
import md5 from 'md5';
import {HttpError} from '../../utils/http-error';

export interface CreateUserParams {
    username: UserName;
    password: UserPassword;
}

export const createUser = createTransactionFunc(createUserFunc);

async function createUserFunc(db: Connection, {username, password}: CreateUserParams): Promise<void> {
    const passwordHash = md5(password);
    
    const okPacket = await queryOkPacket(`
        INSERT INTO user (username, password_hash)
        VALUES (?, ?)
    `, [
        username,
        passwordHash,
    ], db);

    if (!okPacket.affectedRows) {
        throw new HttpError(500, 'user not created', username);
    }
} 
