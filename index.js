const express = require('express');
const morgan = require('morgan');
const router = require('./src/router/router');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/', router);

var server = app.listen(port, () => console.log(`ArmyBazar scraper API is listening on port ${port}!`));

module.exports = server;
