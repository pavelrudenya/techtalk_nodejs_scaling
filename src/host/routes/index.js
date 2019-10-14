const { Router } = require('express');
const router = Router();

router.use('/books', require('./books'));
router.use('/orders', require('./orders'));

module.exports = router;