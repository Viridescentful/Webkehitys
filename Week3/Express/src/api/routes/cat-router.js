import express from 'express';
import {createThumbnail, authenticateToken} from '../../middlewares.js';
import {body} from 'express-validator';
import {validationErrors} from '../../middlewares.js';
import multer from 'multer';

import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatByUserId
} from '../controllers/cat-controller.js';

const catRouter = express();

const upload = multer({ dest: 'Week3/Express/uploads/' });

catRouter
  .route('/')
  .get(getCat)
  .post(
    authenticateToken,
    upload.single('file'),
    body('cat_name').trim().isLength({ min: 3, max: 20 }).isAlphanumeric().escape(),
    body('birthdate').isDate().escape(),
    body('weight').isNumeric().escape(),
    body('owner').escape(),
    validationErrors,
    createThumbnail,
    postCat);

catRouter.route('/:id').get(getCatById).put(
  authenticateToken,
  body('cat_name').trim().isLength({ min: 3, max: 20 }).isAlphanumeric().escape(),
  body('birthdate').isDate().escape(),
  body('weight').isNumeric().escape(),
  body('owner').escape(),
  validationErrors,
  putCat
).delete(authenticateToken, deleteCat);

catRouter.route('/owner/:id').get(getCatByUserId)

export default catRouter;
