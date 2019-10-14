class Subscriber {
    subscribe(message, callback) {
        process.on('message', message => {
            callback(message);
        })
    }
}

module.exports = new Subscriber();