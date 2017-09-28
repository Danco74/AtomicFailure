var GameState = {
    preload: function () {
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
            else if (event.keyCode === 66) // b
                Client.socket.emit('keyPress', {
                    inputId: 'bomb',
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
            else if (event.keyCode === 66) // b
                Client.socket.emit('keyPress', {
                    inputId: 'bomb',
                    state: false
                });
        }


    },
    create: function () {
        function selectPlayerImage(player) {
            if (player._pressingRight) {
                return "playerRight";
            }
            else if (player._pressingLeft) {
                return  "playerLeft";
            }
            else if (player._pressingUp) {
                return "playerUp";
            }
            else {
                return "playerDown";
            }

        }
        Client.socket.on('newPositions', function (data) {
            game.world.removeAll();
            var score = 0;
            var scoreText;
            game.background = game.add.sprite(0, 0, 'background');
            for (var i = 0; i < data.bombs.length; i++) {
                var bombPos = data.bombs[i];
                var bomb = game.add.sprite(bombPos._x, bombPos._y, 'bomb');

                bomb.scale.setTo(0.5, 0.5);
            }
            for (var i = 0; i < data.players.length; i++) {
                var player = data.players[i];

                //select image orientaion based on arrow selection
                var playerImage = selectPlayerImage(player);
                game.add.text(player._x,player._y, player._username,{
                    fontSize: '12px'
                });
                var a = game.add.sprite(player._x+8, player._y+10, playerImage);
                a.animations.add('walk', [data.currentFrame % a.animations._frameData._frames.length]);
                a.animations.play('walk', 1, false);

            }

            for (var i = 0; i < data.explosions.length; i++) {
                var explosion = data.explosions[i];
                game.add.sprite(explosion._x, explosion._y, 'explosion');
            }

            if(data.isDead){
                game.add.text(game.world.centerX,game.world.centerY,"you are dead")
            }

        });

        // this.player = game.add.sprite(40, 100, 'demo1');
        // this.player.animations.add('walk');

        // this.player.animations.play('walk', 10, true);
        // console.log(this.player);
        // this.player.x = 0;

        // game.add.tween(this.player).to({ x: 800 }, 10000, Phaser.Easing.Linear.None, true);
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