const { Router } = require('express');
const router = Router();
const Emitter = require('../../../shared/Emitter');

router
  .route('/')
  .get((req, res, next) => {
    Emitter
    .emitAndWait({ command: 'getBooks' })
    .then(message => {
        res.send(message);
    })
    .catch(next);
  })
  .post((req, res, next) => {
    const book = req.body;

    Emitter
        .emitAndWait({ command: 'createBook', payload: book })
        .then(() => {
            res.send();
        })
        .catch(next);
  })

module.exports = router;