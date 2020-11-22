import {Request, Response} from 'express';
import {extractUserId} from '../../middleware';
import {handleAjvValidateError} from '../../utils/handle-ajv-validate-error';
import {handleExpressError} from '../../utils/handle-express-error';
import {ajvValidate} from '../../utils/validator';
import {remove} from '../methods/remove';
import {INotesServer} from '../types';

export async function noteRouterRemove(req: Request, res: Response) {
    const userId = extractUserId(req);
    const noteId = +req.params.noteId;

    const inParams: INotesServer.INote.InAction.Remove = {
        noteId,
    };

    const {valid, errors} = ajvValidate({note: {remove: inParams}});
    if (!valid) {
        handleAjvValidateError(res, errors);
        return;
    }

    remove(inParams, userId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            handleExpressError(res, error);
        });
};