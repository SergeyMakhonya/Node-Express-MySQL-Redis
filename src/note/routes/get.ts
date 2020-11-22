import {Request, Response} from 'express';
import {extractUserId} from '../../middleware';
import {handleAjvValidateError} from '../../utils/handle-ajv-validate-error';
import {handleExpressError} from '../../utils/handle-express-error';
import {ajvValidate} from '../../utils/validator';
import {get} from '../methods/get';
import {INotesServer} from '../types';

export async function noteRouterGet(req: Request, res: Response) {
    const userId = extractUserId(req);
    const noteId = +req.params.noteId;

    const inParams: INotesServer.INote.InAction.Get = {
        noteId,
    };

    const {valid, errors} = ajvValidate({note: {get: inParams}});
    if (!valid) {
        handleAjvValidateError(res, errors);
        return;
    }

    get(inParams, userId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            handleExpressError(res, error);
        });
};
