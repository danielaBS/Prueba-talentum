'use strict';

var express = require( './node_modules/express' ); 
const bodyParser = require("body-parser");

const routes = require("./routes/routes.js")
const cors = require('cors');
const path = require('path');

const app = express();

// parse requests of content-type: application/x-www-form-urlencoded

app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/xml' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    // IE9 doesn't set headers for cross-domain ajax requests
    if(typeof(req.headers['Content-Type']) === 'undefined'){
        req.headers['Content-Type'] = "application/json; charset=UTF-8";
    }
    next();
})
.use(bodyParser.json());

app.use(cors());

routes('/', app)

// set port, listen for requests
app.listen(8000, () => {
    console.log("Server is running");
});  