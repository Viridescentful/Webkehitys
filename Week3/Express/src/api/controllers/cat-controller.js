import {addCat, findCatById, listAllCats, modifyCat, removeCat, findCatByUserId} from "../models/cat-model.js";
import {validationResult} from 'express-validator';

const getCat = async (req, res) => {

  try {
    const cats = await listAllCats();

    if (cats) {
      res.json(cats);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error fetching all cats:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const getCatById = async (req, res, next) => {
  if (!req.params.id) {
    const error = new Error('Invalid or missing ID');
    error.status = 400;
    next(error);
  }

  try {
    const cat = await findCatById(req.params.id);

    if (cat) {
      res.json(cat);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error fetching cat:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const getCatByUserId = async (req, res, next) => {
  if (!req.params.id) {
    const error = new Error('Invalid or missing ID');
    error.status = 400;
    next(error);
  }

  try {
    const cat = await findCatByUserId(req.params.id);

    if (cat) {
      res.json(cat);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error fetching cat:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const postCat = async (req, res, next) => {
  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    // pass the error to the error handler middleware
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  console.log(req.body);
  req.body.filename = req.file.filename

  try {
    console.log(res.locals.user)
    const result = await addCat(req.body, res.locals.user.user_id);

    console.log(result);

    if (result) {
      res.status(201);
      res.json({message: 'New cat added.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error('Error adding cat:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const putCat = async (req, res, next) => {
  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    // pass the error to the error handler middleware
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  const {user_id, role} = res.locals.user;

  try {
    // Fetch the cat to verify ownership
    const cat = await findCatById(req.params.id);

    if (!cat || (role !== 'admin' && cat[0].owner !== user_id)) {
      return res.status(403).json({message: 'Forbidden'});
    }

    const result = await modifyCat(req.body, req.params.id);

    if (result) {
      res.status(200).json({result});
    } else {
      res.status(400).json({message: 'Update failed'});
    }
  } catch (error) {
    console.error('Error updating cat:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const deleteCat = async (req, res, next) => {
  if (!req.params.id) {
    const error = new Error('Invalid or missing ID');
    error.status = 400;
    next(error);
  }

  const {user_id, role} = res.locals.user;

  try {
    // Fetch the cat to verify ownership
    const cat = await findCatById(req.params.id);

    if (!cat || (role !== 'admin' && cat[0].owner !== user_id)) {
      return res.status(403).json({message: 'Forbidden'});
    }

    const result = await removeCat(req.params.id);

    if (result) {
      res.status(200).json({result});
    } else {
      res.status(400).json({message: 'Delete failed'});
    }
  } catch (error) {
    console.error('Error removing cat:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatByUserId};
