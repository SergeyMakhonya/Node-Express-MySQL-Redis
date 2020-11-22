import {Request, Response} from 'express';
import {extractUserId} from '../../middleware';
import {handleAjvValidateError} from '../../utils/handle-ajv-validate-error';
import {handleExpressError} from '../../utils/handle-express-error';
import {ajvValidate} from '../../utils/validator';
import {create} from '../methods/create';
import {INotesServer} from '../types';

export async function noteRouterCreate(req: Request, res: Response) {
    const userId = extractUserId(req);
    const text = req.body.text;

    const inParams: INotesServer.INote.InAction.Create = {
        text,
    };

    const {valid, errors} = ajvValidate({note: {create: inParams}});
    if (!valid) {
        handleAjvValidateError(res, errors);
        return;
    }

    create(inParams, userId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            handleExpressError(res, error);
        });
};
