const express = require('express');
const morgan = require('morgan');
const router = require('./src/router/router');
const app = express();
const port = 3000;

app.use(morgan('combined'));

app.use('/', router);

app.listen(port, () => console.log(`ArmyBazar scraper API is listening on port ${port}!`));