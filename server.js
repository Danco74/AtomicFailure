//Server modules
var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io').listen(serv);
// var phaser = require('phaser');
// var app2 = phaser();

app.use('/',express.static(__dirname + '/client'));
// app2.use('/',phaser.static(__dirname + '/client'));

//Server startup
serv.listen(2000);
console.log("Server started.");