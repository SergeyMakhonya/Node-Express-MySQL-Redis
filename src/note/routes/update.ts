import {Request, Response} from 'express';
import {extractUserId} from '../../middleware';
import {handleAjvValidateError} from '../../utils/handle-ajv-validate-error';
import {handleExpressError} from '../../utils/handle-express-error';
import {ajvValidate} from '../../utils/validator';
import {update} from '../methods/update';
import {INotesServer} from '../types';

export async function noteRouterUpdate(req: Request, res: Response) {
    const userId = extractUserId(req);
    const noteId = +req.params.noteId;
    const text = req.body.text;

    const inParams: INotesServer.INote.InAction.Update = {
        noteId,
        text,
    };

    const {valid, errors} = ajvValidate({note: {update: inParams}});
    if (!valid) {
        handleAjvValidateError(res, errors);
        return;
    }

    update(inParams, userId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            handleExpressError(res, error);
        });
};