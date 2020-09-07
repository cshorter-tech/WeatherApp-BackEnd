const express = require('express');
const https = require('https');

const app = express();
const location = "London";
const key = ""
const url = `https://api.openweathermap.org/data/2.5/weather${location}?q=${location}&appid=${key}`


app.get('/', function (req, res) {
    https.get(url, function (response) {
        console.log(response);
    })
    res.send("Hello World")
})

app.listen('3000', function () {
    console.log(`Server is running on port 3000..`)
})