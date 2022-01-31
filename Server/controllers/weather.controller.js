'use strict';

const Weather = require("../models/weather.js");

// Retrieve Weather for current time in home city.
exports.getWeather = (req, res) => {
  Weather.getWeather(req.body, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      else res.send(data);
    });

};

// Retrieve Weather for current time in city.
exports.getByLocation = (req, res) => {
  Weather.getByLocation(req.body, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      else res.send(data);
    });

};

// Retrieve Weather for range of time in city.
exports.getByTimeRange = (req, res) => {
  Weather.getByTimeRange(req.body, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      else res.send(data);
    });

};
