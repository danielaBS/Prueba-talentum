'use strict';

const express = require('express');
const dateFormat = require('dateformat');

const weather = require("../controllers/weather.controller.js");


const bodyParser = require("body-parser");
//Comentario
const path = require('path');
const fs = require('fs');

module.exports = function(URI, app) {
    
    // Middleware - Add headers   

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Origin', '*');


        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
    });

    //Weather routes

    app.post('/weather', bodyParser.json({type: 'application/json; charset=UTF-8'}), (req, res) => {//we have req.body JSON
        weather.getWeather(req, res);
    });

    app.post('/weather/getByLocation', bodyParser.json({type: 'application/json; charset=UTF-8'}), (req, res) => {//we have req.body JSON
        weather.getByLocation(req, res);
    });

    app.post('/weather/getByTimeRange', bodyParser.json({type: 'application/json; charset=UTF-8'}), (req, res) => {//we have req.body JSON
        weather.getByTimeRange(req, res);
    });

}