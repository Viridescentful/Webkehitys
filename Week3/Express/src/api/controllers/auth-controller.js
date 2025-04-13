import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {getUserByUsername} from '../models/user-model.js';
import 'dotenv/config';

const logout = async (req, res) => {
  try {
    if (!res.locals.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    res.locals.user = null;

    res.status(200).json({
      message: 'Logged out successfully',
      user: null,
      token: null
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const postLogin = async (req, res) => {
  console.log('postLogin', req.body);
  const user = await getUserByUsername(req.body.username);
  if (!user) {
    res.sendStatus(401);
    return;
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    res.sendStatus(401);
    return;
  }

  const userWithNoPassword = {
    user_id: user.user_id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({user: userWithNoPassword, token});
};

const getMe = async (req, res) => {
  console.log('getMe', res.locals.user);
  if ( res.locals.user) {
    res.json({message: 'token ok', user:  res.locals.user});
  } else {
    res.sendStatus(401);
  }
};

export {postLogin, getMe, logout};
