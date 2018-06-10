const winston = require('winston');
const config = require('config');
require('winston-mongodb');
// require('express');
require('express-async-errors');

module.exports = () => {
    winston.handleExceptions(
        new winston.transports.Console({
            colorize: true, prettyPrint: true, json: true,
        }),
        new winston.transports.File({
            filename: 'uncaughtExceptions.log',
        })
    );

    process.on('unhandledRejection', ex => {
        throw ex;
    });

    winston.add(winston.transports.File, {
        filename: 'serverLog.log',
    });

    winston.add(winston.transports.MongoDB, {
        db: config.get('db.url'),
        level: 'info',
    });
};