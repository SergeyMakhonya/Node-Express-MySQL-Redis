import express from 'express';
import {noteRouterCreate} from './routes/create';
import {noteRouterFind} from './routes/find';
import {noteRouterGet} from './routes/get';
import {noteRouterRemove} from './routes/remove';
import {noteRouterShare} from './routes/share';
import {noteRouterUpdate} from './routes/update';

export const noteRouter = express.Router({mergeParams: true});

noteRouter.get('/', noteRouterFind);
noteRouter.post('/', noteRouterCreate);
noteRouter.get('/:noteId(\\d+)/', noteRouterGet);
noteRouter.put('/:noteId(\\d+)/', noteRouterUpdate);
noteRouter.delete('/:noteId(\\d+)/', noteRouterRemove);
noteRouter.post('/:noteId(\\d+)/share/', noteRouterShare);
