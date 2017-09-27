var game = new Phaser.Game(1200, 1000, Phaser.AUTO);


var Client = {};
Client.socket = io.connect();



var GameState = {

    preload: function () {
        this.load.image('background', 'assets/backround.jpg');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('blast', 'assets/blast.png');
        this.load.image('player', 'assets/RedFront.png');


        Client.socket.on('newPositions', function (data) {
            console.log("I've recieved a message");
        });

        document.onkeydown = function (event) {
            if (event.keyCode === 68) //d
                Client.socket.emit('keyPress', {
                    inputId: 'right',
                    state: true
                });
            else if (event.keyCode === 83) //s
                Client.socket.emit('keyPress', {
                    inputId: 'down',
                    state: true
                });
            else if (event.keyCode === 65) //a
                Client.socket.emit('keyPress', {
                    inputId: 'left',
                    state: true
                });
            else if (event.keyCode === 87) // w
                Client.socket.emit('keyPress', {
                    inputId: 'up',
                    state: true
                });
            else if (event.keyCode === 32) // space
                Client.socket.emit('keyPress', {
                    inputId: 'space',
                    state: true
                });

        }
        document.onkeyup = function (event) {
            if (event.keyCode === 68) //d
                Client.socket.emit('keyPress', {
                    inputId: 'right',
                    state: false
                });
            else if (event.keyCode === 83) //s
                Client.socket.emit('keyPress', {
                    inputId: 'down',
                    state: false
                });
            else if (event.keyCode === 65) //a
                Client.socket.emit('keyPress', {
                    inputId: 'left',
                    state: false
                });
            else if (event.keyCode === 87) // w
                Client.socket.emit('keyPress', {
                    inputId: 'up',
                    state: false
                });
            else if (event.keyCode === 32) // space
                Client.socket.emit('keyPress', {
                    inputId: 'space',
                    state: false
                });
        }



    },
    create: function () {

        Client.socket.on('newPositions', function (data) {
            game.world.removeAll();
            game.background = game.add.sprite(0, 0, 'background');
            for (var i = 0; i < data.bombs.length; i++) {
                var bomb = data.bombs[i];
                game.add.sprite(bomb._x, bomb._y, 'bomb');
            }

            for (var i = 0; i < data.players.length; i++) {
                var player = data.players[i];
                game.add.sprite(player._x, player._y, 'player')
            }

        });


        // this.background = this.game.add.sprite(0, 0, 'background');
        // this.bomb = this.game.add.sprite(0, 0, 'bomb');
        // this.bomb.enlarge = true;
    },
    update: function () {

        // if (this.bomb.enlarge == true) {
        //     this.bomb.scale.x += 0.01;
        //     this.bomb.scale.y += 0.01;
        //     if (this.bomb.scale.x > 1.2) {
        //         this.bomb.enlarge = false;
        //     }
        // } else {
        //     this.bomb.scale.x -= 0.01;
        //     this.bomb.scale.y -= 0.01;
        //     if (this.bomb.scale.x < 0.9) {
        //         this.bomb.enlarge = true;
        //     }
        // }



    }
};

game.state.add("GameState", GameState);
game.state.start("GameState");