// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';



const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users WHERE user_id = ?', [id]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const getUserByUsername = async (user) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users WHERE username = ?', [user]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
}


const addUser = async (user) => {
  const {name, username, email, passwd} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, passwd, "user"];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {cat_id: rows[0].insertId};
};

const modifyUser = async (user, id, role) => {
  let sql, params;

  if (role === 'admin') {
    // Admin can update any user
    sql = `UPDATE wsk_users SET ? WHERE user_id = ?`;
    params = [user, id];
  } else {
    // Regular users can only update their own data
    sql = `UPDATE wsk_users SET ? WHERE user_id = ? AND user_id = ?`;
    params = [user, id, id];
  }

  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);

  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeUser = async (id, role) => {
  let sql, params;

  if (role === 'admin') {
    // Admin can delete any user
    sql = `DELETE FROM wsk_users WHERE user_id = ?`;
    params = [id];
  } else {
    // Regular users can only delete their own data
    sql = `DELETE FROM wsk_users WHERE user_id = ? AND user_id = ?`;
    params = [id, id];
  }

  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);

  if (rows[0].affectedRows === 0) {
    return false;
  }

  const [catrows] = await promisePool.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
  console.log('catrows', catrows);

  await promisePool.execute('DELETE FROM wsk_users WHERE user_id = ?', [id]);

  return {message: 'success'};
};

export {listAllUsers, findUserById, addUser, modifyUser, removeUser, getUserByUsername};
