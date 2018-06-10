const config = require('config');
const winston = require('winston');
const fs = require('fs');
const _ = require('lodash');
const fileModel = require('../models/file');

/**
 * @return Promise<String[]> allTheFile of the configured folder
 */
module.exports.loadAllFile = () => {
    return new Promise((resolve, reject) => {
        // Grab folder paths from config
        // Save in BD once all folder has been processed
        findAllFiles()
            .then(allFiles => fileModel.saveAllFileIfNotExist(filesPath))
            .then(fileInBd => resolve(filesPath));
    });
};

module.exports.startScheduler = function() {
    let date = new Date();
    setInterval(() => {
        findAllFiles().then(allFiles => {
            const filteredByDateFiles = _.filter(allFiles, file => {
                return file.dateCreation > date;
            });
            fileModel.saveAllFileIfNotExist(filteredByDateFiles);
            date = new Date();
        });
    }, 15000);
};

/**
 * @return {String[]} array of files
 */
function findAllFiles() {
    return new Promise((resolve, reject) => {
        folders = config.get('FOLDERS').split(',');
        // Find All files meta from all folder
        filesPath = [];
        promisesFolder = _.map(folders, folder => {
            return addFileFromFolder(folder, filesPath);
        });

        Promise.all(promisesFolder).then(() => resolve(filesPath));
    });
}

/**
 * @param {String} folder Folder path
 * @param {String[]} array previous file array
 * @return {Promise<String[]>} new file array
 */
async function addFileFromFolder(folder, array) {
    return new Promise((resolve, reject) => {
        winston.debug(`Loading folder ${folder}`);
        fs.readdir(folder, (error, files) => {
            if (files.length === 0 ) {
                resolve();
            } else {
                files.forEach(async (fileName, index) => {
                    const fileStat = await getFileStat(folder, fileName);
                    if (fileStat.isDirectory()) {
                       await addFileFromFolder(folder + fileName + '/', array);
                    } else {
                        winston.debug(`Filefound ${folder}${fileName}`);
                        array.push({
                            folder,
                            fileName,
                            dateCreation: fileStat.birthtime,
                        });
                    }
                    if (index == files.length - 1) {
                        resolve();
                    }
                });
            }
        });
    });
}

/**
 * Return the actual file object to save in the database
 *
 * @param {*} folder Folder path
 * @param {*} fileName File name without path
 * @return {Promise} the file object promise
 */
function getFileStat(folder, fileName) {
    return new Promise((resolve, reject) => {
        fs.stat(folder + fileName, (error, fileStat) => {
            if (error) {
                reject(error);
            }
            fileStat.isDirectory();
            resolve(fileStat);
        });
    });
}