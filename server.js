'use strict';
const winston = require('winston');
const fileChecker = require('./schedule/filechecker');
const express = require('express');

const app = express();

// Sarting component
// Log component
require('./startup/log')();

// Setting the routes
require('./startup/routes')(app);

// Db Component
const db = require('./startup/db');

db.then(async () => {
    winston.info('Starting file checker');
    await fileChecker.loadAllFile();
    fileChecker.startScheduler();
});

app.listen(3000, 'localhost');

winston.info('Application started');