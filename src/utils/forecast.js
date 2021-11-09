const request = require("request");
const dotenv = require('dotenv');
dotenv.config();
const access_key = process.env.access_key;
const urlBase = `http://api.weatherstack.com/current?access_key=${ access_key }&query=`;

function forecast(address,callback) {
    const url = `${ urlBase }${ encodeURIComponent(address) }`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (response.body === undefined) {
            callback(
                "Data could not be retrieved for weather in this location. Try another search",
                undefined
            );
        } else {
            const data = response.body;
            callback(undefined, data);
        }
       
    });
}

module.exports = forecast;
