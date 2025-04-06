import {
  deleteCat,
  getCat,
  getCatById,
  postCat,
  putCat,
} from '../controllers/cat-controller.js';

import createThumbnail from '../../middlewares.js';
import express from 'express';
import multer from 'multer';

const catRouter = express.Router();

const upload = multer({dest: 'uploads/'});

catRouter
  .route('/')
  .get(getCat)
  .post(upload.single('file'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

// TODO: Implement this route
catRouter.route('/owner/:id').get();

export default catRouter;
