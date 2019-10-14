const { fork } = require('child_process');

const host = fork('./src/host');
const domain = fork('./src/domain');

host.on('message', (message) => {
    domain.send(message)
})

domain.on('message', (message) => {
    host.send(message)
})

console.log('The app has been forked');