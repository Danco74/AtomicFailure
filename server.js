//Server modules
var express = require('express');
var app = express();
var serv = require('http').Server(app);


//Db modules
var DBHelper = require('./Helpers/DBHelper');
var dbHelper = new DBHelper("localhost","AtomicFailure");





//Game module

var Game = require('./Classes/Game');
var game = new Game();

game._grid.setImpassableRow(0, Math.random());
var DEFAULT_BLOCKS = [
                      {id: Math.random(), row: 4, col: 2},
                      {id: Math.random(), row: 4, col: 5},
                      {id: Math.random(), row: 4, col: 8},
                      {id: Math.random(), row: 7, col: 2},
                      {id: Math.random(), row: 7, col: 5},
                      {id: Math.random(), row: 7, col: 8},
                      {id: Math.random(), row: 10, col: 2},
                      {id: Math.random(), row: 10, col: 5},
                      {id: Math.random(), row: 10, col: 8}
                    ];

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

    game.createBlocks(DEFAULT_BLOCKS);
    
    //create new player
    game.createPlayer(socket.id); 

    
    //upon user submission, update the player name
    socket.on('username',function (data){
        game.updatePlayerName(data.username,socket.id);
    });
    
    //when this session disconnect do the following:
    socket.on('disconnect',function(){
        //delete socket
        delete SOCKET_LIST[socket.id];
        //delete player
        game.deletePlayer(socket.id);
        //delete dead player message
        DEAD_PLAYERS.splice(DEAD_PLAYERS.findIndex(function(obj){
            return obj.id === parseFloat(socket.id);
        }), 1);
    });

    
    //When a key press message is being sent from the client, do the folloing:
    socket.on('keyPress', function (data) {
        game.updateKeys(socket.id, data.inputId, data.state);
    });

});

var currentFrame = 0;
setInterval(function () {

    var pack = {};

    dbHelper.updateScores();
    var scores = dbHelper.getScores();
    pack.scores = scores;

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
            DEAD_PLAYERS.push({id: player.id, username: player.username, score: player.score, saved:false});
        game.placeBomb(player.id);
    } 

    for(var i in DEAD_PLAYERS) {
        game.killPlayer(DEAD_PLAYERS[i].id)
    }

    pack["players"] = game.players;
    pack["bombs"] = game.bombs;
    pack["explosions"] = game.explosions;
    pack["currentFrame"] = currentFrame;
    pack["isDead"] = false;
    pack["blocks"] = game.blocks;


    //Update all clients states
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        var isDeadIndex = DEAD_PLAYERS.findIndex(function(obj){
            return obj.id === parseFloat(i);
        });
        if(isDeadIndex >= 0) {
            pack["isDead"] = true;
            pack["score"] = DEAD_PLAYERS[isDeadIndex].score;
            if (!DEAD_PLAYERS[isDeadIndex].saved){
            dbHelper.addScore(DEAD_PLAYERS[isDeadIndex].id, DEAD_PLAYERS[isDeadIndex].username,DEAD_PLAYERS[isDeadIndex].score);
            DEAD_PLAYERS[isDeadIndex].saved = true;
            }
        }
        var index = game._players.findIndex(function (currentObj) {
            return currentObj.id === parseFloat(i);
        });
        if(index >= 0) {
            pack["score"] = game.players[index]._score;
        }
        socket.emit('newPositions', pack);
        pack["isDead"] = false;
    }
}, 60);

