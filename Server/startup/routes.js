const files = require('../routes/files');
const {json} = require('express');
const home = require('../routes/home');

/**
 * Add Express route and middleware in this method
 * @param {Express} app The express app to add the route to
 */
module.exports = function(app) {
    app.use(json());
    app.use(corsAllowing);
    app.use('/api/files', files);
    app.use('/', home);
};

const corsAllowing = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};