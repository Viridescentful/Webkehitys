import {addUser, findUserById, listAllUsers, modifyUser, removeUser} from "../models/user-model.js";
import {validationResult} from 'express-validator';
import bcrypt from 'bcrypt';

const getUser = async (req, res) => {
  try {
    const users = await listAllUsers()

    if (users) {
      res.json(users);
    } else {
      res.sendStatus(404);
    }

  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const getUserById = async (req, res, next) => {
  if (!req.params.id) {
    const error = new Error('Invalid or missing ID');
    error.status = 400;
    next(error);
  }

  try {
    const user = await findUserById(req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const postUser = async (req, res, next) => {
  //console.log(req.body);
  //req.body.filename = req.file.filename

  const errors = validationResult(req);
  // check if any validation errors
  if (!errors.isEmpty()) {
    // pass the error to the error handler middleware
    const error = new Error('Invalid or missing fields');
    error.status = 400;
    return next(error);
  }

  req.body.passwd = bcrypt.hashSync(req.body.passwd, 10);

  try {
    const result = await addUser(req.body);

    console.log(result);

    if (result) {
      res.status(201);
      res.json({message: 'New user added.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};


const putUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    // check if any validation errors
    if (!errors.isEmpty()) {
      // pass the error to the error handler middleware
      const error = new Error('Invalid or missing fields');
      error.status = 400;
      return next(error);
    }

    const {user_id, role} = res.locals.user;

    // Check if the user is authorized to update
    if (role !== 'admin' && user_id !== parseInt(req.params.id)) {
      return res.status(403).json({message: 'Forbidden'});
    }

    const result = await modifyUser(req.body, req.params.id, role);

    if (result) {
      res.status(200).json({result});
    } else {
      res.status(400).json({message: 'Update failed'});
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};


const deleteUser = async (req, res, next) => {
  // not implemented in this example, this is future homework
  if (!req.params.id) {
    const error = new Error('Invalid or missing ID');
    error.status = 400;
    next(error);
  }

  try {
    const {user_id, role} = res.locals.user;

    // Check if the user is authorized to delete
    if (role !== 'admin' && user_id !== parseInt(req.params.id)) {
      return res.status(403).json({message: 'Forbidden'});
    }

    const result = await removeUser(req.params.id, role);

    if (result) {
      res.status(200).json({result});
    } else {
      res.status(400).json({message: 'Delete failed'});
    }
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};


export {getUser, getUserById, postUser, putUser, deleteUser};
