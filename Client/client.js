//Create a new game object
var game = new Phaser.Game(1200, 1000, Phaser.AUTO);


//Create client object to handle server communications
var Client = {};
Client.socket = io.connect();


var GameState = {

    preload: function () {
        //Loading assets
        this.load.image('background', 'assets/backround.jpg');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('blast', 'assets/blast.png');
        this.load.image('player1', 'assets/RedFront.png');
        this.load.image('explosion', 'assets/explosion.png');
        this.load.spritesheet('player', 'assets/down.png', 45, 72, 4);
    },
    create: function () {

        //==============Key bindings================
        //==========================================

        //On key down bindings
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
            else if (event.keyCode === 66) // b
                Client.socket.emit('keyPress', {
                    inputId: 'bomb',
                    state: true
                });

        }

        //On key up bindings
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
            else if (event.keyCode === 66) // b
                Client.socket.emit('keyPress', {
                    inputId: 'bomb',
                    state: false
                });
        }



        //Listening to "new positions" messages coming from the serever
        Client.socket.on('newPositions', function (data) {

            //Clear canvas
            game.world.removeAll();
            //Draw background
            game.background = game.add.sprite(0, 0, 'background');
            //Draw bombs
            for (var i = 0; i < data.bombs.length; i++) {
                var bombPos = data.bombs[i];
                var bomb = game.add.sprite(bombPos._x, bombPos._y, 'bomb');

                bomb.scale.setTo(0.5, 0.5);
            }
            //Draw players
            for (var i = 0; i < data.players.length; i++) {
                var player = data.players[i];
                var a = game.add.sprite(player._x, player._y, 'player');
                a.animations.add('walk', [data.currentFrame % a.animations._frameData._frames.length]);
                a.animations.play('walk', 1, false);

            }
            //Draw explosions
            for (var i = 0; i < data.explosions.length; i++) {
                var explosion = data.explosions[i];
                game.add.sprite(explosion._x, explosion._y, 'explosion');
            }

        });


    }
};


//Add game state
game.state.add("GameState", GameState);
game.state.start("GameState");