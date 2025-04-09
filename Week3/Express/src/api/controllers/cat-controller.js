import {addCat, findCatById, listAllCats, modifyCat, removeCat, findCatByUserId} from "../models/cat-model.js";

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

const getCatById = async (req, res) => {
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

const getCatByUserId = async (req, res) => {
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

const postCat = async (req, res) => {
  console.log(req.body);
  //req.body.filename = req.file.filename

  try {
    const result = await addCat(req.body);

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

const putCat = async (req, res) => {
  // not implemented in this example, this is future homework

  try {
    const result = await modifyCat(req.body, req.params.id);

    if (result) {
      res.status(200);
      res.json({result});
    }

  } catch (error) {
    console.error('Error updating cat:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const deleteCat = async (req, res) => {
  // not implemented in this example, this is future homework


  try {
    const result = await removeCat(req.body, req.params.id);

    if (result) {
      res.status(200);
      res.json({result});
    }
  } catch (error) {
    console.error('Error removing cat:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatByUserId};
