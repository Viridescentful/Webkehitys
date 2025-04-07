import {addUser, findUserById, listAllUsers} from "../models/user-model.js";

const getUser = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const User = findUserById(req.params.id);
  if (User) {
    res.json(User);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New User added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  // not implemented in this example, this is future homework
  res.json({message: 'User Updated.'});
  res.sendStatus(200);
};

const deleteUser = (req, res) => {
  // not implemented in this example, this is future homework
  res.json({message: 'User Deleted.'});
  res.sendStatus(200);
};

export {getUser, getUserById, postUser, putUser, deleteUser};
