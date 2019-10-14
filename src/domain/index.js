const calculateFibo = require('../shared/calculateFibo');
const newId = require('../shared/newId');
const Subscriber = require('../shared/Subscriber');
const Emitter = require('../shared/Emitter');

const bookExists = (bookId) => {
    if (!bookId) {
        return;
    }

    return books.find(book => book.id === bookId);
}

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

Subscriber.subscribe('message', (message) => {
    console.log(message);
    switch(message.command) {
        case 'getOrders': {
            getOrders().then(orders => Emitter.emit({ txId: message.txId, payload: orders }));

            break;
        }
        case 'getBooks': {
            getBooks().then(books => Emitter.emit({ txId: message.txId, payload: books }));

            break;
        }
        case 'createOrder': {
            createOrder(message.payload).then(() => Emitter.emit({ txId: message.txId }));

            break;
        }
        case 'createBook': {
            createBook(message.payload).then(() => Emitter.emit({ txId: message.txId }));

            break;
        }
        case 'getOrdersTotal': {
            getOrdersTotal(30).then(total => Emitter.emit({ txId: message.txId, payload: total }));

            break;
        }
    }
})