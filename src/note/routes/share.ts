import {Request, Response} from 'express';
import {extractUserId} from '../../middleware';
import {handleAjvValidateError} from '../../utils/handle-ajv-validate-error';
import {handleExpressError} from '../../utils/handle-express-error';
import {ajvValidate} from '../../utils/validator';
import {share} from '../methods/share';
import {INotesServer} from '../types';

export async function noteRouterShare(req: Request, res: Response) {
    const userId = extractUserId(req);
    const noteId = +req.params.noteId;

    const inParams: INotesServer.INote.InAction.Share = {
        noteId,
    };

    const {valid, errors} = ajvValidate({note: {share: inParams}});
    if (!valid) {
        handleAjvValidateError(res, errors);
        return;
    }

    share(inParams, userId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            handleExpressError(res, error);
        });
};
