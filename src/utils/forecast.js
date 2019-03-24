const request = require('request');

const darkskyKey = '07dd58eb19750d7ca03b5bd7be560f2e';

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${darkskyKey}/${latitude},${longitude}?units=si`;

    request({ url, json: true }, (error, { body } = {})=>{
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary}. It is currently ${body.currently.temperature}°C out. There is a ${body.currently.precipProbability * 100}% chance of rain.`);
        };
    });
};

module.exports = forecast;
