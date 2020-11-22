import request from 'supertest';
import {app} from '../../src/app';

export interface TestMethodResult {
    success: boolean;
    responseBody: any;
    statusCode: number;
}

export const postTestMethod = (method: string, params: any, expectedCode: number, authToken?: string): Promise<TestMethodResult> => new Promise<TestMethodResult>((resolve, reject) => {
    request(app)
        .post(method)
        .auth(authToken, { type: 'bearer' })
        .send(params)
        .expect(expectedCode, (err, res) => {
            if (err) {
                resolve({
                    success: false,
                    responseBody: res.body,
                    statusCode: (res as any).statusCode,
                });
            }

            resolve({
                success: true,
                responseBody: res.body,
                statusCode: (res as any).statusCode,
            });
        });
});

export const getTestMethod = (method: string, params: any, expectedCode: number, authToken?: string): Promise<TestMethodResult> => new Promise<TestMethodResult>((resolve, reject) => {
    request(app)
        .get(method)
        .auth(authToken, { type: 'bearer' })
        .query(params)
        .expect(expectedCode, (err, res) => {
            if (err) {
                resolve({
                    success: false,
                    responseBody: res.body,
                    statusCode: (res as any).statusCode,
                });
            }

            resolve({
                success: true,
                responseBody: res.body,
                statusCode: (res as any).statusCode,
            });
        });
});

export const putTestMethod = (method: string, params: any, expectedCode: number, authToken?: string): Promise<TestMethodResult> => new Promise<TestMethodResult>((resolve, reject) => {
    request(app)
        .put(method)
        .auth(authToken, { type: 'bearer' })
        .send(params)
        .expect(expectedCode, (err, res) => {
            if (err) {
                resolve({
                    success: false,
                    responseBody: res.body,
                    statusCode: (res as any).statusCode,
                });
            }

            resolve({
                success: true,
                responseBody: res.body,
                statusCode: (res as any).statusCode,
            });
        });
});

export const deleteTestMethod = (method: string, params: any, expectedCode: number, authToken?: string): Promise<TestMethodResult> => new Promise<TestMethodResult>((resolve, reject) => {
    request(app)
        .delete(method)
        .auth(authToken, { type: 'bearer' })
        .send(params)
        .expect(expectedCode, (err, res) => {
            if (err) {
                resolve({
                    success: false,
                    responseBody: res.body,
                    statusCode: (res as any).statusCode,
                });
            }

            resolve({
                success: true,
                responseBody: res.body,
                statusCode: (res as any).statusCode,
            });
        });
});
