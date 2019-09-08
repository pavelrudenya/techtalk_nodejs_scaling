const { Router } = require('express');
const router = Router();

router
  .route('/books')
  .get((req, res) => {
    res.sendStatus(200);
  })
  .post((req, res) => {
    res.sendStatus(200);
  })

router
  .route('/orders')
  .get((req, res) => {
    res.sendStatus(200);
  })
  .post((req, res) => {
    res.sendStatus(200);
  })

module.exports = router;