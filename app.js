const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', function (req, res) {
    const queryLocation = req.body.cityName;
    const key = process.env.NODE_APP_WEATHER_API_KEY
    const units = "Imperial"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${queryLocation}&appid=${key}&units=${units}`
    console.log("Post message recieved.")
    https.get(url, function (response) {
        console.log('statusCode:', response.statusCode);
        response.on('data', function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const iconCode = weatherData.weather[0].icon
            const imageURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
            res.write(`<h1>The temperature in ${queryLocation} is ${temp}&degF </h1>`);
            res.write(`<p>The weather is currently ${weatherDescription}.<p>`);
            res.write(`<img src="${imageURL}" alt="image blank"></img>`);
            res.send();
        })
    })
    // res.send("Hello World")
})






app.listen('3000', function () {
    console.log(`Server is running on port 3000..`)
    // console.log(url)
})