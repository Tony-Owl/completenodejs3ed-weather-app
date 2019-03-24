// API key:
const darksky = require('./apiKeys/darksky');
//  Darksky API (https://darksky.net/dev)
//   Template URL:
//     const lat = 37.8267
//     const lon = -122.4233
//     https://api.darksky.net/forecast/${darksky.key}/${lat},${lon}
//
// Customazible Options (query string: url?key=value&otherKey=otherValue):
//     exclude=[blocks] -> currently, minutely, hourly, daily, alerts, flags
//     extend=hourly -> (from 48h to 168h)
//     lang=[language] -> de, en, es, fr, it, ja, pt etc.
//     units=[units] -> us, si
//

const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${darksky.key}/${latitude},${longitude}?units=si`;

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
