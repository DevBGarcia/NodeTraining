// Problem: Use Treehouse's API to get profile information to print out

// const fetch = require('node-fetch');

// Require used to retrieve .js modules
const profile = require('./profile.js');
const weatherApi = require('./weatherApi.js');
const querystring = require("querystring");

let input = process.argv.slice(2).join(' ');
console.log(input);
weatherApi.getWeather(input);
