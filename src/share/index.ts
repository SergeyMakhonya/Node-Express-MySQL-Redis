import express from 'express';
import {shareRouterGet} from './routes/get';

export const shareRouter = express.Router({mergeParams: true});

shareRouter.get('/:hash(\\w+)', shareRouterGet);
