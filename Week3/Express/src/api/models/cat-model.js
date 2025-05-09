// Note: db functions are async and must be called with await from the controller
// How to handle errors in controller?
import promisePool from '../../utils/database.js';


const listAllCats = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
  console.log('rows', rows);
  return rows;
};

const findCatById = async (id) => {


  const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE cat_id = ?', [id]);
  console.log('rows', rows);

  if (rows.length === 0) {
    return false;
  }

  const [userrows] = await promisePool.execute('SELECT name FROM wsk_users WHERE user_id = ?', [rows[0].owner]);
  console.log('rows', userrows);

  return [rows[0], userrows];
};


const findCatByUserId = async (id) => {
  console.log(id)
  const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE owner = ?', [id]);
  console.log('rows', rows);

  if (rows.length === 0) {
    return false;
  }

  const [userrows] = await promisePool.execute('SELECT name FROM wsk_users WHERE user_id = ?', [rows[0].owner]);
  console.log('rows', userrows);

  return [rows[0], userrows];
};

const addCat = async (cat, tokenid) => {
  const {cat_name, weight, filename, birthdate} = cat;

  console.log(tokenid);

  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, tokenid, filename, birthdate];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {cat_id: rows[0].insertId};
};

const modifyCat = async (cat, id) => {
  const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [cat, id]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeCat = async (id) => {
  const [rows] = await promisePool.execute('DELETE FROM wsk_cats WHERE cat_id = ?', [id]);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

export {listAllCats, findCatById, addCat, modifyCat, removeCat, findCatByUserId};
