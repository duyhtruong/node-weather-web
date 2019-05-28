const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/5927aae86a4888aa91b8c804751af7e9/' + long + ',' + lat 

    request({url, json: true}, (error, { body })=>{ 
        if(error){
            callback('error',undefined)
        } else if (body.error) {
            callback('error', undefined)
        } else{
            callback(undefined,
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature+ ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'   
                )
        }
    }) 
}


module.exports = forecast