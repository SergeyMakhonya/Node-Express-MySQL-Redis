import {Request, Response} from 'express';
import {extractUserId} from '../../middleware';
import {handleAjvValidateError} from '../../utils/handle-ajv-validate-error';
import {handleExpressError} from '../../utils/handle-express-error';
import {ajvValidate} from '../../utils/validator';
import {find} from '../methods/find';
import {INotesServer} from '../types';

export async function noteRouterFind(req: Request, res: Response) {
    const userId = extractUserId(req);
    const cursor = req.query.cursor ? +req.query.cursor : 0;
    const count = req.query.count ? +req.query.count : 10;

    const inParams: INotesServer.INote.InAction.Find = {
        cursor,
        count,
    };

    const {valid, errors} = ajvValidate({note: {find: inParams}});
    if (!valid) {
        handleAjvValidateError(res, errors);
        return;
    }

    find(inParams, userId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            handleExpressError(res, error);
        });
};
