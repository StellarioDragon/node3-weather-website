const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d3cb8cd20999e661f63334b636417700&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to API.')
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            data = body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + '. It feels like ' + body.current.feelslike + ' out. The UV Index is ' + body.current.uv_index + '.'
            callback(undefined, data)
        }
    })
}

module.exports = forecast