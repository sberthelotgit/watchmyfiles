const mongoose = require('mongoose');
const Joi = require('joi');
const winston = require('winston');
const _ = require('lodash');


const fileSchema = new mongoose.Schema({
    fileName: String,
    folder: String,
    dateCreation: Date,
});

const File = mongoose.model('File', fileSchema);


/**
 *
 * @param {*} file
 * @return {{x : Boolean}}
 */
function validate(file) {
    // Schema for post and put validation
    const schema = {
        fileName: Joi.string().min(3).required(),
        folder: Joi.string().trim().required(),
        dateCreation: Joi.date(),
    };
    return Joi.validate(file, schema);
}

/**
 * Save all the file in the mongo database
 * @param {File[]} files
 * @return {Promise} The saved files promise
 */
async function saveAllFileIfNotExist(files) {
    return new Promise(async (resolve, reject) => {
        winston.debug(`File to save : ${files}`);
        const query = File.find();
        query.select('fileName folder');
        const result = await query.exec();
        _.forEach(result, dbFile => {
            _.remove(files, file => file.folder === dbFile.folder && file.fileName === dbFile.fileName);
        });
        const savedFiles = _.map(files, file => File.create(file));
        winston.debug(`File saved in BD : ${savedFiles}`);
        Promise.all(savedFiles).then(()=> resolve(savedFiles));
        // TODO
    });
}

module.exports.File = File;
module.exports.validateFile = validate;
module.exports.saveAllFileIfNotExist = saveAllFileIfNotExist;