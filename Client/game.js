var GameState = {
    preload: function () {

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
        var on;

        var expEffect = game.add.audio('explosionEffect') ;

        function selectPlayerImage(playerPos) {
            if (playerPos._pressingRight) {
                on = "walk";
                return "playerRight";
              
            }
            else if (playerPos._pressingLeft) {
                on = "walk";
                return  "playerLeft";
            }
            else if (playerPos._pressingUp) {
                on = "walk";
                return "playerUp";
            }
            else if(playerPos._pressingDown) {
                on = "walk";
                return "playerDown";
            }
            else{
                on='';
                return "playerDown";

            }

        }
        
            Client.socket.on('newPositions', function (data) {
            game.world.removeAll();
           
            game.background = game.add.sprite(0, 0, 'background');

            var x_count = 675;
            var y_count = 0;
            for (var i=0; i< data.scores.length;i++){
            game.add.text(675,y_count,data.scores[i].name+": "+data.scores[i].score,{
                    fill:'#000000',
                    fontSize:'12px'
                });
                y_count+=15;
            }

            var scoreText = game.add.text(16, 16, 'Score: ' + data.score, { fontSize: '32px', fill: '#000' });
            for (var i = 0; i < data.bombs.length; i++) {
                var bombPos = data.bombs[i];
                var bomb = game.add.sprite(bombPos._x, bombPos._y, 'potions');
                bomb.animations.add('bomb', [data.currentFrame % bomb.animations._frameData._frames.length]);
                bomb.animations.play('bomb', 1, false);
                // bomb.scale.setTo(0.5, 0.5);
            }
            for (var i = 0; i < data.players.length; i++) {
                var playerPos = data.players[i];

                //select image orientaion based on arrow selection
                var playerImage = selectPlayerImage(playerPos);
                game.add.text(playerPos._x,playerPos._y,playerPos._username,{
                    fontSize: '14px'
                });
        
                var player = game.add.sprite(playerPos._x, playerPos._y+10, playerImage);
                player.animations.add('walk', [data.currentFrame % player.animations._frameData._frames.length]);
                player.animations.play(on, 1, false);

            }

            for (var i = 0; i < data.explosions.length; i++) {
                var explosionPos = data.explosions[i];
                var explosion = game.add.sprite(explosionPos._x, explosionPos._y, 'explosion1');
                explosion.animations.add('explode', [data.currentFrame % explosion.animations._frameData._frames.length]);
                explosion.animations.play('explode', 1, false);
                expEffect.play();
            }

            if(data.isDead){
                game.add.text(game.world.centerX,game.world.centerY,"you are dead");
            }
            // for (var i=0;i<data.blocks.length;i++){
            //     var block = data.blocks[i];
            //     block.add.sprite(block._x,block._y,'sink');
            // }
        });

    },
};