import {Request, Response} from 'express';
import {handleAjvValidateError} from '../../utils/handle-ajv-validate-error';
import {handleExpressError} from '../../utils/handle-express-error';
import {ajvValidate} from '../../utils/validator';
import {signup} from '../methods/signup';
import {INotesServer} from '../types';

export async function authRouterSignup(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    const inParams: INotesServer.IAuth.InAction.Signup = {
        username,
        password,
        passwordConfirm,
    };

    const {valid, errors} = ajvValidate({auth: {signup: inParams}});
    if (!valid) {
        handleAjvValidateError(res, errors);
        return;
    }

    signup(inParams)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            handleExpressError(res, error);
        });
};
