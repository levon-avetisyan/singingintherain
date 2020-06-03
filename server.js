'use strict';
// ================================================================
// get all the tools we need
// ================================================================
var express = require('express');
var routes = require('./index.js');
var port = process.env.PORT || 3000;
var app = express();
// ================================================================
// setup our express application
// ================================================================
app.use(express.static(__dirname + '/build'));
app.use('./', express.static(process.cwd() + '/build'));
app.set('view engine', 'ejs');
// app.use('/js', express.static(__dirname + '/node_modules/'));
// ================================================================
// setup routes
// ================================================================
routes(app);
// ================================================================
// start our server
// ================================================================
app.listen(port, function() {
    console.log('Server listening on port ' + port + '…');
});