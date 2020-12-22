const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'John LeMay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Leomon',
        name: 'Leomon'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'John'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errror: 'Must provide an address'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    location,
                    forecast: forecastData, 
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })


    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'John',
        error: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not found',
        name: 'Johnny',
        error: 'Page not found.'

    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})