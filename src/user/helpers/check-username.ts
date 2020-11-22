import {Connection} from 'mysql';
import {UserName} from '../../base-types';
import {query} from '../../database';

interface UserDB {
    userId: number;
}

export async function checkUsername(userName: UserName, db?: Connection): Promise<boolean> {
    const result = await query<UserDB>(`
        SELECT
            user_id as userId
        FROM
            user
        WHERE
            username = ?
    `, [userName], db);

    return !!result.length;
}
