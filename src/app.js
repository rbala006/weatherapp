const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handle bar engine
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', { title: 'Weather App - Home', name: 'Bala' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'Weather App - About', name: 'Bala' })
})
app.get('/help', (req, res) => {
    res.render('help', { title: 'Weather App - Help', helperText: 'This is some helpful text', name: 'Bala' })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({error:'Provide Address'})
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }

            console.log(location)
            console.log(forecastData)
            res.send({
                forecast: forecastData,
                location: location,
                address:req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({ error: "Provide search term" })
    }
    else {
        console.log(req.query)
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', { title: 'Help not found', errorMessage: 'Help article missing', name: 'Bala' })
})

app.get('*', (req, res) => {
    res.render('notfound', { title: 'Page Not Found', errorMessage: 'Please check link', name: 'Bala' })
})


// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({name:'Bala',Age:'34'})
// })

// app.get('/about', (req, res) => {
//     res.send('About Page')
// })

// app.get('/weather', (req, res) => {
//     res.send('Weather Page')
// })


app.listen(3000, () => {
    console.log('Server is up at port 3000')
})