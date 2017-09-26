//Server modules
var express = require('express');
var app = express();
var serv = require('http').Server(app);

//Game module
/*
var Game = require('Classes/Game');
var game = new Game();
*/


app.use('/', express.static(__dirname + '/client'));


//Server startup
serv.listen(2000);
console.log("Server started.");


//Decllaring socket list
var SOCKET_LIST = {};
var io = require('socket.io')(serv, {});

//On connection - when a client setup a connection with the server,
//do the following:
io.sockets.on('connection', function (socket) {
    //Create random id for the socket
    socket.id = Math.random();
    //add the new session into the socket list
    SOCKET_LIST[socket.id] = socket;

    //create new player
    /* var player = Game.createPlayer(socket.id); //a player object should be returned here */

    //when this session disconnect do the following:
    /*
    socket.on('disconnect',function(){
        //delete socket
        delete SOCKET_LIST[socket.id];
        //delete player
        Game.remove(player);
    });
    */

    //When a key press message is being sent from the client, do the folloing:
    socket.on('keyPress', function (data) {
        //if the left key was pressed, move player left
        if (data.inputId === 'left')
            player.moveLeft();
        //if the right key was pressed move right
        else if (data.inputId === 'right')
            player.moveRight();
        //if the up key was pressed move up
        else if (data.inputId === 'up')
            player.moveUp();
        //if the down key was pressed move down
        else if (data.inputId === 'down')
            player.moveDown();
    });

});


setInterval(function () {

    /*
        var pack = {};

        //Update players positions
        for(var player in game.players){
            var player = game.players[player];

            //update players position
            player.updatePosition();

            pack["playerPosition"] = {
                x: player.x,
                y: player.y
            };    
        }

        //Update bombs positions
        for (var bomb in game.bombs){
            var bomb = game.bombs[bomb];
            
            
            pack["bombsPosition"] = {
                x: bomb.x,
                y: bomb.y
            };
        }

    */

    var pack = {};

    pack["players"] = [{
            x: 500,
            y: 500
        },
        {
            x: 384,
            y: 489
        }
    ];

    pack["bombs"] = [{
        x: 300,
        y: 300
    }, {
        x: 700,
        y: 700
    }];

    //Update all clients states
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions', pack);
    }

}, 1000 / 25);