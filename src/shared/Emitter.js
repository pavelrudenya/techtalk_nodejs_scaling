const newId = require('./newId');

class Emitter {
    emit(message) {
        process.send(message);
    }

    emitAndWait(message) {
        return new Promise((resolve, reject) => {
            message.txId = newId();

            process.send(message)

            const timeout = setTimeout(() => reject(), 5000);

            process.on('message', (msg) => {
                if (msg.txId === message.txId) {
                    console.log(msg);
                    resolve(msg.payload);
                }

                clearTimeout(timeout);
            });
        });
    }
}

module.exports = new Emitter();