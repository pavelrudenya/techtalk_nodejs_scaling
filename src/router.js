const { Router } = require('express');
const router = Router();
const crypto = require("crypto");
const calculateFibo = require('./utils/calculateFibo');

// NOTE: utils
const newId = () => {
  return crypto.randomBytes(16).toString("hex");;
}

const bookExists = (bookId) => {
  if (!bookId) {
    return;
  }

  return books.find(book => book.id === bookId);
}

// NOTE: Domain and business logic
const books = [
  {
    id: newId(),
    title: 'NodeJS in Action',
    price: 100,
  },
  {
    id: newId(),
    title: 'You don\'t know JS',
    price: 110,
  },
]

const orders = [
  {
    id: newId(),
    book_id: books[0].id,
    count: 2,
  },
]

const getOrders = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(orders));
  })
}

const createOrder = (order) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order && bookExists(order.bookId)) {
        orders.push({
          id: newId(),
          bookId: order.bookId,
          count: order.count,
        });

        resolve();
      } else {
        reject();
      }
    });
  })
}

const getBooks = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(books));
  })
}

const createBook = (book) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (book) {
        books.push({
          id: newId(),
          title: book.title,
          price: book.price,
        });

        resolve();
      } else {
        reject();
      }
    });
  })
}

const getOrdersTotal = () => {
  return new Promise((resolve, reject) => {
    // NOTE: CPU intensive task
    const fibo = calculateFibo(30);

    resolve(fibo);
  })
}

// NOTE: REST API
router
  .route('/books')
  .get((req, res, next) => {
    getBooks()
      .then(books => res.status(200).send(books))
      .catch(next);
  })
  .post((req, res, next) => {
    const book = req.body;

    createBook(book)
      .then(() => res.sendStatus(200))
      .catch(next);
  })

router
  .route('/orders')
  .get((req, res, next) => {
    getOrders()
      .then(orders => res.status(200).send(orders))
      .catch(next);
  })
  .post((req, res, next) => {
    const order = req.body;

    createOrder(order)
      .then(() => res.sendStatus(200))
      .catch(next);
  })

router
  .route('/orders/total')
  .get((req, res, next) => {
    getOrdersTotal()
      .then(total => res.status(200).send(total))
      .catch(next);
  })

module.exports = router;