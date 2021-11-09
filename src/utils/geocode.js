const request = require("request");
/* const forecast = require("./forecast"); */
const dotenv = require('dotenv');
dotenv.config();

const access_token = process.env.access_token
const urlBase = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

const geocode = (address, callback) => {
    const urlMapbox = `${ urlBase }${ encodeURIComponent(address) }.json?access_token=${ access_token }`;

    request({ url: urlMapbox, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('Coordinate data could not be retrieved at this location. Try another search', undefined)
        }
        else {
            const data = response.body.features[0];
            callback(undefined, data)
        }
    });
}

module.exports = geocode

