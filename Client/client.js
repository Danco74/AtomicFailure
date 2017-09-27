var game = new Phaser.Game(1200, 1000, Phaser.AUTO);


var Client = {};
Client.socket = io.connect();



var GameState = {

    preload: function () {
        this.load.image('background', 'assets/backround.jpg');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('blast', 'assets/blast.png');
        this.load.spritesheet('demo', 'assets/capguy-walk.png', 185, 325, 7);
        this.load.image('player', 'assets/RedFront.png');
        

        Client.socket.on('newPositions', function (data) {
            console.log("I've recieved a message");
        });

        document.onkeydown = function (event) {
            if (event.keyCode === 68) //d
                socket.emit('keyPress', {
                    inputId: 'right',
                    state: true
                });
            else if (event.keyCode === 83) //s
                socket.emit('keyPress', {
                    inputId: 'down',
                    state: true
                });
            else if (event.keyCode === 65) //a
                socket.emit('keyPress', {
                    inputId: 'left',
                    state: true
                });
            else if (event.keyCode === 87) // w
                socket.emit('keyPress', {
                    inputId: 'up',
                    state: true
                });

        }
        document.onkeyup = function (event) {
            if (event.keyCode === 68) //d
                socket.emit('keyPress', {
                    inputId: 'right',
                    state: false
                });
            else if (event.keyCode === 83) //s
                socket.emit('keyPress', {
                    inputId: 'down',
                    state: false
                });
            else if (event.keyCode === 65) //a
                socket.emit('keyPress', {
                    inputId: 'left',
                    state: false
                });
            else if (event.keyCode === 87) // w
                socket.emit('keyPress', {
                    inputId: 'up',
                    state: false
                });
        }



    },
    create: function () {

        Client.socket.on('newPositions',function(data){
            game.world.removeAll();
            game.background = game.add.sprite(0, 0, 'background');
            for (var i=0;i<data.bombs.length;i++){
                var bomb = data.bombs[i];
                var player = data.players[i];
                game.add.sprite(bomb.x,bomb.y,'bomb');
                game.add.sprite(player.x,player.y,'player');
            }
            
        });


        // this.background = this.game.add.sprite(0, 0, 'background');
        // this.bomb = this.game.add.sprite(0, 0, 'bomb');
        // this.bomb.enlarge = true;

        this.player = game.add.sprite(40, 100, 'demo');
        this.player.animations.add('walk');
        
        this.player.animations.play('walk', 10, true);
        // sprite.x = 0;
        
        game.add.tween(this.player).to({ x: 800 }, 10000, Phaser.Easing.Linear.None, true);

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

/*
var game = new Phaser.Game(1200,1000,Phaser.AUTO,'game',{ preload: preload, create: create, update: update });

var sprite;
var background;
var ball;
function preload() {
game.load.image('background','assets/background.jpg');
game.load.spritesheet('demo', 'assets/capguy-walk.png', 185, 325, 7);
game.load.spritesheet('ball', 'assets/wobble.png', 20, 20);

}

function create() {
background = game.add.sprite(100,100,'background');
// ball = game.add.sprite(50, 250, 'ball');
// ball.animations.add('wobble');
// ball.animations.play('wobble',20,true);
// game.add.tween(ball).to({x:800},10000,Phaser.Easing.Linear.None,true);

sprite = game.add.sprite(40, 100, 'demo');
sprite.animations.add('walk');

sprite.animations.play('walk', 10, true);
// sprite.x = 0;

game.add.tween(sprite).to({ x: 800 }, 10000, Phaser.Easing.Linear.None, true);

}
*/