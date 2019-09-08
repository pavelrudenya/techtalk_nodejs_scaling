const { fork } = require('child_process');

fork('./src/app', ['3001']);
fork('./src/app', ['3002']);

console.log('Forked the app');