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

//  update isn't called until 'create' has completed. If you need to process stuff before that point (i.e. while the preload is still happening)
//  then create a function called loadUpdate() and use that
function update() {
    

}

//-- render every second 
//updtae bomb positions
//update player positions
//update explosding bombs positions

// var GameState = {
    
//     preload: function(){
//         this.load.image('background','assets/background.jpg');
//         this.load.spritesheet('demo', 'assets/capguy-walk.png', 185, 325, 8);
//     },
//     create: function(){
//         this.background = this.game.add.sprite(250,250,'background');
//         this.sprite = 
//     },
//     update: function(){

//     }
// };
// game.state.add("GameState",GameState);
// game.state.start("GameState");
