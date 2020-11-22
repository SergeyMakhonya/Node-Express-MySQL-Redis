import {config} from '../config';

export class HttpError extends Error {
    constructor (public code: number, public message: string, public data?: any) {
        super(`HttpError ${code}`);
        Object.setPrototypeOf(this, HttpError.prototype);
        if (config.isDevelopment) {
            console.log(this.toJsonBody());
        }
    }

    public toJsonBody(): { status: 'error', message: string, data?: any } {
        return {
            status: 'error',
            message: this.message,
            data: this.data,
        };
    }
}
