const express = require('express');
const { readFileSync } = require('fs');
const app = express();
const port = 3000;

app
  .route('/books')
  .get((req, res) => {
    readFileSync('loadtesting.txt');
    res.sendStatus(200);
  })
  .post((req, res) => {
    res.sendStatus(200);
  })

app
  .route('/orders')
  .get((req, res) => {
    res.sendStatus(200);
  })
  .post((req, res) => {
    res.sendStatus(200);
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`));