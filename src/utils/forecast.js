const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=' + latitude + ',' + longitude + '&units=m'

    request({ url: url, json: true }, (error, {body} ={} )=> {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + 
            " degrees out. But it feels like "+body.current.feelslike+". Humidity is "+body.current.humidity+" %")

        }
    })
}

module.exports = forecast