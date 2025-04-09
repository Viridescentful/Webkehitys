import {addUser, findUserById, listAllUsers, modifyUser, removeUser} from "../models/user-model.js";

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

const getUserById = async (req, res) => {
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

const postUser = async (req, res) => {
  console.log(req.body);
  //req.body.filename = req.file.filename

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

const putUser = async (req, res) => {
  // not implemented in this example, this is future homework

  try {
    const result = await modifyUser(req.body, req.params.id);

    if (result) {
      res.status(200);
      res.json({result});
    }

  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const deleteUser = async (req, res) => {
  // not implemented in this example, this is future homework


  try {
    const result = await removeUser(req.params.id);

    if (result) {
      res.status(200);
      res.json({result});
    }
  } catch (error) {
    console.error('Error removing user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};
