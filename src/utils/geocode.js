const request = require('request');

const mapboxKey = 'pk.eyJ1IjoidG9ueW93bGFwaSIsImEiOiJjanQ3YnZ2OTIwcWZoNDNyMWEyZDE2ZXZjIn0.KSARRhm8kBXIyTovsqM7VA';

const geocode = (address, callback) => {

    const searchText = encodeURI(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${mapboxKey}&limit=1`;

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
