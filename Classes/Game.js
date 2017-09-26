class Game {
    constructor() {
        this._players = []; // Player objects
        this._bombs = [];   // Bomb objects
        this._blocks = [];  // Block objects
        this._grid = new Grid();
    }

    // Getters //
    get players() {
        return this._players;
    }

    // Other Methods //
    createPlayer(id){
        var xPos = 0; // Math.random???
        var yPos = 0;
        var newPlayer = new Player(id, xPos, yPos);
        this._players.push(newPlayer);
        // return newPlayer? or return this._players?
    }
}

// Export //
module.exports = Game;