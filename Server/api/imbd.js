const request = require('request');
const _ = require('lodash');
const winston = require('winston');


/**
 *
 * @param {string} movie title
 * @return {Promise}
 */
module.exports.getImbdInfo = movie => {
    return new Promise((resolve, reject) => {
        const encodedMovie = encodeURIComponent(movie);
        request({
            url: `http://www.omdbapi.com/?apiKey=c98ed7c0&t=${encodedMovie}`,
            json: true,
        }, (error, response, body) => {
            winston.info(body);
            if (error) {
                reject('Unable to connect omdbapi servers.');
            } else if (body.Response === 'False') {
                reject('Unable to find that this movie.');
            } else if (body.Response === 'True') {
                resolve(_.pick(body, [
                    'Year',
                    'Runtime',
                    'Genre',
                    'Director',
                    'Writer',
                    'Actors',
                    'Plot',
                    'Language',
                    'Country',
                    'Awards',
                    'Poster',
                    'Metascore',
                    'imdbRating',
                    'imdbID',
                    'Type',
                    'BoxOffice',
                    'Production',
                    'Website',
                ]));
            }
        });
    });
};