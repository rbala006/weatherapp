const request = require('request')

const geocode = (address, callback) => {
    const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmJhbGEwMDYiLCJhIjoiY2tkOXBqeDZuMTZidDJxc2NreHNiaHU4ZyJ9.e-BU2jwIJ9no6DWQm12ptA'
    request({ url: geocodeurl, json: true }, (error, {body}) => {
        if (error) {
            //callback('Unable to connect', undefined)
            callback({error:'Unable to connect'})
        }
        else if (body.features.length === 0) {
            //callback('Unable to find location', undefined)
            callback({error:'Unable to find location'})
        }
        else {
            callback(undefined, { 
                latitude: body.features[0].center[0], 
                longitude: body.features[0].center[1],
                location:  body.features[0].place_name
            })
        }
    })
}

module.exports= geocode