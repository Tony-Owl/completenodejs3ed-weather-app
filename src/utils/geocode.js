// API Key:
const mapbox = require('./apiKeys/mapbox');
//  Mapbox API (https://docs.mapbox.com/api/search/)
//   Template URL:
//     const searchText = encodeURI('string with the address');
//     https://api.mapbox.com/geocoding/v5/mapbox.places/{searchText}.json?token=${mapbox.key}&limit=1

const request = require('request');

const geocode = (address, callback) => {

    const searchText = encodeURI(address);    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${mapbox.key}&limit=1`;

    request({ url, json: true}, (error, { body } = {}) => {        
        if(error){
            callback('Unable to connect to location services!');
        } else if (body.features.length === 0) {
            callback('Unable to find location! Try another search.');
        } else {            
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });            
        };
    });
};

module.exports = geocode;
