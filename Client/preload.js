var PreloadState = {
    //this state loads all the assets that the game uses and then calls the start screen once everything is loaded
    preload:function() {

        // this.load.image('logo', 'assets/RedFront.png');
        // this.logo =this.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo').anchor.set(0.5);
        this.load.image('background', 'assets/background.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('blast', 'assets/blast.png');
        this.load.image('explosion', 'assets/explosion.png');
        this.load.image('sink', 'assets/sink.png');
        this.load.spritesheet('playerDown','assets/down.png',48,80,8);
        this.load.spritesheet('playerUp','assets/up.png',47,68,8);
        this.load.spritesheet('playerLeft','assets/left.png',40,55,4);
        this.load.spritesheet('playerRight','assets/right.png',40,55,4);
        this.load.spritesheet('potions','assets/potions.png',29,37,4);
        this.load.spritesheet('logo','assets/potionshome.png',87,111,4);
        this.load.spritesheet('explosion1','assets/explosion1.png',48,45,14);

    },

    create:function(){
        game.state.start('StartState');
    }

}