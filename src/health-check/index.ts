import express from 'express';
import {INotesServer} from './types';

type Out = INotesServer.IHealthCheck.OutAction.Get;

export const healthCheckRouter = express.Router();

healthCheckRouter.get('/', (req, res) => {
    const jsonResult: Out = {
        status: 'availabled',
        timestamp: Date.now(),
    };
    
    res.json(jsonResult);
});