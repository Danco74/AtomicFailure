//Server modules
var express = require('express');
var app = express();
var serv = require('http').Server(app);

//Game module

var Game = require('./Classes/Game');
var game = new Game();



app.use('/', express.static(__dirname + '/client'));
app.use('/', express.static(__dirname + '/node_modules'));


//Server startup
serv.listen(2000);
console.log("Server started.");


//Decllaring socket list
var SOCKET_LIST = {};
var io = require('socket.io')(serv, {});
var DEAD_PLAYERS = [];

//On connection - when a client setup a connection with the server,
//do the following:
io.sockets.on('connection', function (socket) {
    //Create random id for the socket
    socket.id = Math.random();
    //add the new session into the socket list
    SOCKET_LIST[socket.id] = socket;

    //create new player
    game.createPlayer(socket.id); 

    //when this session disconnect do the following:
    
    socket.on('disconnect',function(){
        //delete socket
        delete SOCKET_LIST[socket.id];
        //delete player
        game.deletePlayer(socket.id);
        //delete dead player message
        DEAD_PLAYERS.splice(DEAD_PLAYERS.indexOf(parseFloat(socket.id)), 1);
    });
    
    //When a key press message is being sent from the client, do the folloing:
    socket.on('keyPress', function (data) {
        console.log(data);
            game.updateKeys(socket.id, data.inputId, data.state);
    });

});

var currentFrame = 0;
setInterval(function () {

    var pack = {};

    game.updateBombTimers();
    game.updateExplosionTimers();
  
    currentFrame++;
    if (currentFrame > 1000)
        currentFrame=0;
  
    for(var player in game.players){
        var player = game.players[player];

        //update players position
        game.movePlayer(player.id);
        if(player.isDead)
            DEAD_PLAYERS.push(player.id);
        game.placeBomb(player.id);
    } 

    for(var i in DEAD_PLAYERS) {
        game.killPlayer(DEAD_PLAYERS[i])
    }

    pack["players"] = game.players;
    pack["bombs"] = game.bombs;
    pack["explosions"] = game.explosions;
    pack["currentFrame"] = currentFrame;
    pack["isDead"] = false;



    //Update all clients states
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        var isDeadIndex = DEAD_PLAYERS.indexOf(parseFloat(i));
        if(isDeadIndex >= 0) {
            pack["isDead"] = true;
        }
        socket.emit('newPositions', pack);
        pack["isDead"] = false;
    }
}, 60);

