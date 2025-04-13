import express from 'express';
import api from './api/index.js';
import cors from 'cors';
import {notFoundHandler, errorHandler} from './middlewares.js';

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1', api);

app.get('/', (req, res) => {
    res.send('Welcome to my REST API!');
});

app.get('/api/v1/bunny', (req, res) => {
  res.send({
    "cat_id": 1,
    "name": "Ulpukka",
    "birthdate": "2024-01-01",
    "weight": 4.5,
    "owner": "Veikko",
    "image": "https://loremflickr.com/320/240/cat",
  });
});

app.use('/public', express.static('Week3/Express/public'));

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
