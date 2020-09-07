const express = require('express');
const https = require('https');
require('dotenv').config();

const app = express();
const location = "London";
const key = process.env.NODE_APP_WEATHER_API_KEY
const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`


app.get('/', function (req, res) {
    https.get(url, function (response) {
        console.log('statusCode:', response.statusCode);
        response.on('data', function (data) {
            console.log(JSON.parse(data).weather[0].description);
        })
    })
    res.send("Hello World")
})

app.listen('3000', function () {
    console.log(`Server is running on port 3000..`)
    // console.log(url)
})