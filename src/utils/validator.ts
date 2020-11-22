import * as schema from '../json-schema/notes-server.json';
import Ajv, {ValidateFunction, ErrorObject} from 'ajv';

const ajv = new Ajv();
ajv.addSchema(schema, 'notes-server.json');

const validatorsMap = new Map<string, ValidateFunction>();

const createValidator = (ref: string): ValidateFunction => {
    let validator = validatorsMap.get(ref);
    if (!validator) {
        validator = ajv.compile({
            $ref: `notes-server.json#/definitions/${ref}`,
        });
        validatorsMap.set(ref, validator);
    }
    return validator;
};

const ajvValidateFunc = createValidator('INotesServer.InAction');

export interface AjvValidateResult {
    valid: boolean;
    errors?: ErrorObject[];
}

export const ajvValidate = (obj: any): AjvValidateResult => {
    if (ajvValidateFunc(obj)) {
        return {
            valid: true,
        };
    } else {
        return {
            valid: false,
            errors: ajvValidateFunc.errors,
        };
    }
};
