import {Response} from 'express';
import {config} from '../config';
import {HttpError} from './http-error';

export const handleExpressError = (res: Response, error: Error) => {
    if (error instanceof HttpError) {
        res
            .status(error.code)
            .send(config.isDevelopment ? error.toJsonBody() : {})
            .end();
    } else {
        res
            .status(500)
            .end();
    }
};