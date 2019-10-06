const { fork } = require('child_process');

fork('./src/app', ['3001']);
fork('./src/app', ['3002']);

console.log('The app has been forked');