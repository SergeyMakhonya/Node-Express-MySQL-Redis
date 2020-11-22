import express from 'express';
import {authRouterSignup} from './routes/signup';
import {authRouterSignin} from './routes/signin';
import {authRouterSignout} from './routes/signout';

export const authRouter = express.Router({mergeParams: true});

authRouter.post('/signup', authRouterSignup);
authRouter.post('/signin', authRouterSignin);
authRouter.post('/signout', authRouterSignout);
