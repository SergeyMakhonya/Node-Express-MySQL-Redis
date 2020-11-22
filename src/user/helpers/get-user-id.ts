import {Connection} from 'mysql';
import {UserId, UserName, UserPassword} from '../../base-types';
import {query} from '../../database';
import md5 from 'md5';

interface UserDB {
    userId: number;
    passwordHash: string;
}

export async function getUserId(username: UserName, userPassword: UserPassword, db?: Connection): Promise<UserId> {
    const result = await query<UserDB>(`
        SELECT
            user_id as userId,
            password_hash as passwordHash
        FROM
            user
        WHERE
            username = ?
    `, [username], db);

    if (!result.length) {
        return 0;
    }

    const passwordHash = md5(userPassword);

    if (passwordHash !== result[0].passwordHash) {
        return 0;
    }

    return result[0].userId;
}
