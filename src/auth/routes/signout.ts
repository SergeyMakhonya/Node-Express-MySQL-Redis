import {Request, Response} from 'express';
import {extractUserId} from '../../middleware';
import {handleAjvValidateError} from '../../utils/handle-ajv-validate-error';
import {handleExpressError} from '../../utils/handle-express-error';
import {ajvValidate} from '../../utils/validator';
import {signout} from '../methods/signout';
import {INotesServer} from '../types';

export async function authRouterSignout(req: Request, res: Response) {
    const userId = extractUserId(req);

    const inParams: INotesServer.IAuth.InAction.Signout = {};

    const {valid, errors} = ajvValidate({auth: {signout: inParams}})
    if (!valid) {
        handleAjvValidateError(res, errors);
        return;
    }

    signout(userId)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            handleExpressError(res, error);
        });
};
