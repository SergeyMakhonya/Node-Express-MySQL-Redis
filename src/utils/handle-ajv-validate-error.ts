import {Response} from 'express';
import {config} from '../config';
import {ErrorObject} from 'ajv';

export function handleAjvValidateError(res: Response, errors?: ErrorObject[]) {
    res
        .status(400)
        .send(config.isDevelopment ? (errors ?? []) : [])
        .end();
}