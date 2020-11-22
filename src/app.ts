import express from 'express';
import {healthCheckRouter} from './health-check';
import {noteRouter} from './note';
import bodyParser from 'body-parser';
import {shareRouter} from './share';
import {authRouter} from './auth';
import {authMiddleware} from './middleware';

export const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(authMiddleware);

app.use('/health-check', healthCheckRouter);
app.use('/note', noteRouter);
app.use('/shared', shareRouter);
app.use('/auth', authRouter);

app.get('*', (req, res) => res.status(404).end());
