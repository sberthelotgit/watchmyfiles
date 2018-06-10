const db = require('mongoose');
const config = require('config');

const logger = require('winston');


module.exports = new Promise((resolve, reject) => {
        db.connect(config.get('db.url'))
        .then(dbObject => {
            logger.info(`Connection success on database : ${dbObject.connections[0].name}`);
            resolve(dbObject);
        })
        .catch(error =>{
            logger.error(`Error while connecting : ${e.message}`);
            reject(dbObject);
        });
});
