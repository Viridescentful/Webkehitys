import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to my REST API!');
});

app.get('/api/v1/cat', (req, res) => {
  res.send({
    "cat_id": 1,
    "name": "Ulpukka",
    "birthdate": "2024-01-01",
    "weight": 4.5,
    "owner": "Veikko",
    "image": "https://loremflickr.com/320/240/cat",
  });
});

app.use('/public', express.static('Week3/Node/public'));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
