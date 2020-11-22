import {NextFunction, Request, Response} from 'express';
import {UserId} from '../base-types';
import {config} from '../config';
import {jwtCheck, JwtPayload} from '../utils/jwt';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const url = req.url.split('?')[0];
    
    const filtered = config.publicUrls.filter((item) => url.indexOf(item) === 0);

    if (filtered.length) {
        return next();
    }
    
    const token = ('' + req.headers.authorization).replace('Bearer ', '');

    if (!token) {
        return res.status(401).end();
    }

    jwtCheck(token)
        .then((jwtPayload: JwtPayload) => {
            insertUserId(req, jwtPayload.userId);
            next();
        })
        .catch(() => {
            return res.status(401).end();
        });
}

function insertUserId(req: Request, userId: UserId) {
    (req as any).userId = userId;
}

export function extractUserId(req: Request): UserId {
    return (req as any).userId;
}
