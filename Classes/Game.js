class Game {
    constructor() {
        this.players = []; // Player objects
        this.bombs = [];   // Bomb objects
        this.map = new Map();
    }

    createPlayer(id){
        var xPos = 0; // Math.random???
        var yPos = 0;
        var newPlayer = new Player(id, xPos, yPos);
        this.players.push(newPlayer);
        // return newPlayer? or return this.players?
    }
}

// Export //
module.exports = Game;