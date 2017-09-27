var PreloadState = {
    //this state loads all the assets that the game uses and then calls the start screen once everything is loaded
    preload:function() {

        // this.load.image('logo', 'assets/RedFront.png');
        // this.logo =this.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo').anchor.set(0.5);
        this.load.image('background', 'assets/backround.jpg');
        this.load.image('space','assets/space.jpg');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('blast', 'assets/blast.png');
        this.load.image('explosion', 'assets/explosion.png');
        this.load.spritesheet('playerDown','assets/down.png',48,64,8);
        this.load.spritesheet('playerUp','assets/up.png',47,68,8);
        this.load.spritesheet('playerLeft','assets/left.png',44,64,1);
        this.load.spritesheet('playerRight','assets/right.png',44,64,2);

    },

    create:function(){
        game.state.start('StartState');
    }

}