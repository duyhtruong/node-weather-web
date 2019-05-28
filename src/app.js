const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()



//define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//serve folder directory from root, setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))





app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name:'Duy'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'about me',
        name: 'duy'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        message: 'help blah',
        title: 'Help',
        name: 'duy'
    })
})


//what happens when user goes to certain route
app.get('/weather', (req,res)=>{
    if(!req.query.address){
        res.send({
            error: 'must have address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({
                error: error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
            res.send({
                    error:error
                })
            }
    
            res.send({
                location: location,
                forecastData: forecastData,
                address: req.query.address
            })
     
          })
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide search term'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req,res)=>{
    res.render('404', {
        error: 'Help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Duy',
        error: 'page not found'
    })
})


//to start server

app.listen(3000, () => {
    console.log('server is up on port 3000')
})