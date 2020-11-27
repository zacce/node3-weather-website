const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
    
// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title:'Weather',
        name:'Sakari Heino'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
    title:'About Me',
    name:'Sakari Heino'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
    title:'Help page',
    helpText: 'This is some helpful text',
    name:'Sakari Heino'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must to provide a location'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({error})
        }
     
        forecast(latitude, longitude,(error, forecastData)  => {
            if (error) {
                return res.send({error})
            } 
            res.send({ 
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
        
  
app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must to provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Sakari Heino',
        errorMessage:'Help article not found.'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Sakari Heino',
        errorMessage:'Page not found'
    })
})



app.listen(port, () => {
    console.log('Server is up on port '+port)
})