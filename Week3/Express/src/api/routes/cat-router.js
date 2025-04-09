import express from 'express';
//import multer from 'multer';
//import createThumbnail from '../../middlewares.js';

import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatByUserId
} from '../controllers/cat-controller.js';

const catRouter = express();

//const upload = multer({ dest: 'Week3/Express/uploads/' });

catRouter
  .route('/').get(getCat).post(postCat)
  //.post(upload.single('file'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);
catRouter.route('/owner/:id').get(getCatByUserId)

export default catRouter;
