import {Request, Response} from 'express';
import {handleAjvValidateError} from '../../utils/handle-ajv-validate-error';
import {handleExpressError} from '../../utils/handle-express-error';
import {ajvValidate} from '../../utils/validator';
import {get} from '../methods/get';
import {INotesServer} from '../types';

export async function shareRouterGet(req: Request, res: Response) {
    const hash = req.params.hash;

    const inParams: INotesServer.IShare.InAction.Get = {
        hash,
    };

    const {valid, errors} = ajvValidate({share: {get: inParams}});
    if (!valid) {
        handleAjvValidateError(res, errors);
        return;
    }

    get(inParams)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            handleExpressError(res, error);
        });
};
