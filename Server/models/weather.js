'use strict';

const util = require('util');

//Path to mockData
const weatherData = require('../Mock-data/weatherData.js');

// constructor
const Weather = function(weather) {
};

//Get weather only if var'key' exists

Weather.getWeather = async function (data, result) {
  if(data.key !== undefined && data.key !== null && data.key!== "") {
    var weather = await weatherData.getWeather(data);
    result(null, weather)
  } else {
    result (null, "No se pudo consultar el clima")
  }
};

Weather.getByLocation = async function (data, result) {
  if(data.key !== undefined && data.key !== null && data.key!== "") {
    var weather = await weatherData.getWeather(data);
    result(null, weather)
  } else {
    result (null, "No se pudo consultar el clima")
  }    
};

Weather.getByTimeRange = async function (data, result) {
  if(data.key !== undefined && data.key !== null && data.key!== "") {
    var weather = await weatherData.getByTimeRange(data);
    result(null, weather)
  } else {
    result (null, "No se pudo consultar el clima")
  } 
};

module.exports = Weather;
