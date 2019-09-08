const cluster = require('cluster');
const express = require('express');
const router = require('./router');
const app = express();
const numCpus = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);
    for (let index = 0; index < numCpus; index++) {
        cluster.fork();
    }
} else {
    app.use('/', (req, res, next) => {
        console.log(`Child process ${process.pid} has received a request to ${req.path}.`);
        next();
    })
    app.use('/', router);
    app.listen(3000, () => console.log(`Child process ${process.pid} listening on port 3000!`));
}