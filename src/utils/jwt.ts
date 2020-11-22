import redis from 'redis';
import * as jwt from 'jsonwebtoken';
import {config} from '../config';
import {UserId} from '../base-types';

const redisClient = redis.createClient();

redisClient.on('error', function(error) {
    console.error('REDIS ERROR: ' + error);
});

const redisUserTokensKey = (userId: UserId) => `user_${userId}_tokens`;

export interface JwtPayload {
    userId: UserId;
}

export function jwtSign(payload: JwtPayload): string {
    const {userId} = payload;
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: config.jwtExpiresIn});

    redisClient.lpush(redisUserTokensKey(userId), token)

    return token;
}

export function jwtCheck(token: string): Promise<JwtPayload> {
    return new Promise<JwtPayload>((resolve, reject) => {
        const jwtPayload = jwt.verify(token, config.jwtSecret) as JwtPayload;

        redisClient.lrange(redisUserTokensKey(jwtPayload.userId), 0, 1000, (error, tokens: string[]) => {
            if (error) {
                reject(error);
            }

            const tokenContains = !!tokens.filter((item) => item === token).length;
            
            if (tokenContains) {
                resolve(jwtPayload);
            } else {
                reject();
            }
        });
    });
}

export function jwtDestroyAll(userId: UserId): void {
    redisClient.del(redisUserTokensKey(userId));
}
