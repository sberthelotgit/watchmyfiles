const config = require('config');
const winston = require('winston');
const fs = require('fs');
const _ = require('lodash');


module.exports.loadAllFile = () => {
    return new Promise((resolve, reject) => {
        // Grab folder paths from config
        folders = config.get('FOLDERS').split(',');

        // Find All files from all folder
        filesPath = [];
        promisesFolder = _.map(folders, folder => {
            return addFileFromFolder(folder, filesPath);
        });

        Promise.all(promisesFolder).then(saveAllFile(filesPath)).then(() => {
            winston.debug(`File loading over ${filesPath}`);
            resolve(filesPath);
        });
    });
};

module.exports.startScheduler = function() {
    setInterval(() => {
        // TODO Load new files if exist
    }, 300000);
};

/**
 * @param {String} folder Folder path
 * @param {String[]} array previous file array
 * @return {Promise<String[]>} new file array
 */
async function addFileFromFolder(folder, array) {
    return new Promise((resolve, reject) => {
        winston.info(`Loading folder ${folder}`);
        fs.readdir(folder, (error, files) => {
            files.forEach(async (fileName, index) => {
                winston.info(`Filefound ${folder}${fileName}`);

                const fileStat = await getFileObject(folder, fileName);
                array.push(fileStat);
                if (index == files.length - 1) {
                    resolve();
                }
            });
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
function getFileObject(folder, fileName) {
    return new Promise((resolve, reject) => {
        fs.stat(folder + fileName, (error, fileStat) =>{
            if (error) {
                reject(error);
            }
            fileStat.isDirectory();
            resolve({folder, fileName, dateCreate: fileStat.birthtime});
        });
    });
}


/**
 * Save all the file in the mongo database
 * @param {*} files
 * @return {Promise} The saved files promise
 */
function saveAllFile(files) {
    return new Promise((resolve, reject) => {
        // TODO
        resolve();
    });
}