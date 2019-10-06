const express = require('express');
const router = require('./router');
const app = express();
const bodyParser = require('body-parser');
const port = process.argv[2] || '3000';

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`A ${req.method} request to ${req.url}`);

    next();
})

app.use('/', router);

app.listen(port, () => console.log(`The app is listening on port ${port}!`));