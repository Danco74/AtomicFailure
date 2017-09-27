var game = new Phaser.Game(800, 800, Phaser.AUTO,'game');

var Client = {};
Client.socket = io.connect();

//add the different game states to the game
game.state.add("PreloadState", PreloadState);
game.state.add("StartState", StartState);
game.state.add("GameState", GameState);

//start the first game state- which is the startScreen
game.state.start("PreloadState");
