import express from 'express';
import {getMe, postLogin, logout} from '../controllers/auth-controller.js';
import {authenticateToken} from '../../middlewares.js';
const authRouter = express();

authRouter.route('/login').post(postLogin);

authRouter.route('/logout').get(authenticateToken, logout)

authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
