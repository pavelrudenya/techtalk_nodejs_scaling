const { Router } = require('express');
const router = Router();
const Emitter = require('../../../shared/Emitter');

router
  .route('/')
  .get((req, res, next) => {
    Emitter
        .emitAndWait({ command: 'getOrders' })
        .then(message => {
            res.send(message);
        })
  })
  .post((req, res, next) => {
    const order = req.body;

    Emitter
        .emitAndWait({ command: 'createOrder', payload: order })
        .then(() => {
            res.send();
        })
        .catch(next);
  })

router
  .route('/total')
  .get((req, res, next) => {
    Emitter
        .emitAndWait({ command: 'getOrdersTotal' })
        .then(message => {
            res.send({ total: message });
        })
  })

module.exports = router;