var PreloadState = {
    //this state loads all the assets that the game uses and then calls the start screen once everything is loaded
    preload:function() {

        // this.load.image('logo', 'assets/RedFront.png');
        // this.logo =this.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo').anchor.set(0.5);
        this.load.image('background', 'Assets/background.png');
        this.load.image('bomb', 'Assets/bomb.png');
        this.load.image('blast', 'Assets/blast.png');
        this.load.image('explosion', 'Assets/explosion.png');
        this.load.image('sink', 'Assets/sink.png');
        this.load.spritesheet('playerDown','Assets/down.png',48,80,8);
        this.load.spritesheet('playerUp','Assets/up.png',47,68,8);
        this.load.spritesheet('playerLeft','Assets/left.png',40,55,4);
        this.load.spritesheet('playerRight','Assets/right.png',40,55,4);
        this.load.spritesheet('potions','Assets/potions.png',29,37,4);
        this.load.spritesheet('logo','Assets/potionshome.png',87,111,4);
        this.load.spritesheet('explosion1','Assets/explosion1.png',48,45,14);
        this.load.audio('music', 'Assets/music.mp3');
        this.load.audio('explosionEffect', 'Assets/explosion.mp3');

    },

    create:function(){
        game.state.start('StartState');
    }

}