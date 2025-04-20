import express from 'express';
import {authenticateToken} from '../../middlewares.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares.js';

import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express();

userRouter.route('/').get(getUser).post(
  body('email').trim().isEmail().escape(),
  body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric().escape(),
  body('passwd').trim().isLength({min: 8}).escape(),
  validationErrors,
  postUser
);

userRouter.route('/:id').get(getUserById).put(
  authenticateToken,
  body('email').trim().isEmail().escape(),
  body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric().escape(),
  body('passwd').trim().isLength({min: 8}).escape(),
  validationErrors,
  putUser).delete(authenticateToken, deleteUser);

export default userRouter;
