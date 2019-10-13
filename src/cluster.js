const cluster = require('cluster');
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');

const app = express();
const numCpus = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);
    for (let index = 0; index < numCpus; index++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        console.log(`Process ${process.pid}: ${req.method} request to ${req.url}`);
    
        next();
    })
    
    app.use('/', router);
    app.listen(3000, () => console.log(`Child process ${process.pid} is listening on port 3000!`));
}