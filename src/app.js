// Node Core Modules and 3rd party libraries:
const path = require('path');
const express = require('express');
const hbs = require('hbs');

// Own modules:
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Creating an instance of the express web-server:
const app = express();

// Define paths for express config:
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const author = 'Tony Owl';

// Setup handlebars enginge and views/partials location:
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve:
app.use(express.static(publicDirectoryPath));

// Setup routes:
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: author
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: author
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: author
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    };

    geocode(req.query.address, (error, { latitude, longitude, location } = {})=>{
        if (error) {
            return res.send({ error });
        };

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            };

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    };

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: author,
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: author,
        errorMessage: 'Page not found.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});