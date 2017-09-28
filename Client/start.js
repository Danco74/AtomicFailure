
var StartState = {
    //the create function is everything that happens on the start screen
    create: function(){
        game.add.plugin(PhaserInput.Plugin);
        game.stage.backgroundColor = '#000';
        //display high scores from database
        game.add.text(100,100,"HighScore 1:"+x+" \nHighScore 2: \nHighScore 3: \nHighScore 4: \nHighScore 5: ",{
            fill:'#FF0000'
        })
        
        music = game.add.audio('music');
        music.play();


        var potionLogo = game.add.sprite(300,300,'potionshome');
        // potionLogo.animations.add('logo');
        // potionLogo.animations.play('logo', 1, false);

        var pressEnter = game.add.text(300,400,"Press Enter To Start");
        pressEnter.font = '100px monospace';
        pressEnter.fill = '#fff'

        game.username = game.add.inputField(250, 300, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Enter Username',
            type: PhaserInput.InputType.text
        });
        
        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        //once the user hit the S, move into the start function
        enterKey.onDown.addOnce(this.start, this);
    },
    //the start function starts the next game state - which is game play
    start: function(){
        //send username value to server
        Client.socket.emit('username', {
            username: game.username.value,
        });
        game.state.start('GameState');
    }


}