const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine, views and partials location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ahmed Hafez'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ahmed Hafez',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Contact us if you need any help',
        title: 'Help',
        name: 'Ahmed Hafez'

    });
});

app.get('/weather', (req, res) => {

    const address = req.query.address;

    if (!address) {
        return res.send({
            error: 'Please enter a valid address !'
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        forecast(latitude, longitude, (error, { description, temperature, feelslike } = {}) => {
            if (error) {
                return res.send({
                    error: error
                });
            }
            res.send({
                address, location, description, temperature, feelslike
            })
        });

    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: '404',
        name: 'Ahmed Hafez'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Ahmed Hafez'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

