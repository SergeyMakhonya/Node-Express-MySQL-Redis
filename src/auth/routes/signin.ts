import {Request, Response} from 'express';
import {handleAjvValidateError} from '../../utils/handle-ajv-validate-error';
import {handleExpressError} from '../../utils/handle-express-error';
import {ajvValidate} from '../../utils/validator';
import {signin} from '../methods/signin';
import {INotesServer} from '../types';

export async function authRouterSignin(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;

    const inParams: INotesServer.IAuth.InAction.Signin = {
        username,
        password,
    };

    const {valid, errors} = ajvValidate({auth: {signin: inParams}});
    if (!valid) {
        handleAjvValidateError(res, errors);
        return;
    }

    signin(inParams)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            handleExpressError(res, error);
        });
};
