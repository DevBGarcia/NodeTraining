const https = require('https');
const http = require('http');

const apiKey = require('./apiKey.json');
const kelvinToFahrenheit = require('kelvin-to-fahrenheit');

function printError(error){
    console.error(`ERROR CAUGHT: ${error.message}`);
}

function getWeather(zipCode){

    try{
        const request = https.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey.Key}`, response => {
            if(response.statusCode === 200){
                let body = "";
                response.on('data', chunk => {
                    body += chunk;
                })
                response.on('end', () => {
                    let weatherData = JSON.parse(body);
                    console.log(`It is ${kelvinToFahrenheit(weatherData.main.temp)}F in ${weatherData.name}.`);                  
                })
            }else{
                // Status Code Error 
                const statusCodeError = new Error(`There was an error retrieving data from the api server - ${response.statusCode} - ${http.STATUS_CODES[response.statusCode]}`);
                printError(statusCodeError);
            }   
        });
        
    }catch(error){
        //URL Error
        printError(error);
    }
}

module.exports.getWeather = getWeather;
