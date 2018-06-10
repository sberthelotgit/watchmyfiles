'use strict';
const winston = require('winston');
const fileChecker = require('./schedule/filechecker');

// Sarting component
// Log component
require('./startup/log')();

// Db Component
const db = require('./startup/db');

db.then(async () => {
    winston.info('Starting file checker');
    await fileChecker.loadAllFile();
    fileChecker.startScheduler();
});

winston.info('Application started');