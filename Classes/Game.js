// Imports //
var Grid = require('./Grid');
var Player = require('./Player');
var Bomb = require('./Bomb');
var Block = require('./Block');

// Class //
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
    createPlayer(id) {
        var xPos = 0; // Math.random???
        var yPos = 0;
        var newPlayer = new Player(id, xPos, yPos);
        this._players.push(newPlayer);
        // return newPlayer? or return index inside this._players?
    }

    deletePlayer(id) {
        var index = _findIndexById(this._players, id);
        this._players.splice(index, 1);
    }

    movePlayer(id, direction, keyState) {
        var index = _findIndexById(this._players, id);
        var player = this._players[index];
        var originalGridPos = {row: player.row, col: player.col}
        player.movePosition(direction, keyState);
        var tileObject = this._grid.getTileObject(player.row, player.col);

        if (tileObject.hasOwnProperty('block') || tileObject.hasOwnProperty('bomb')) { // Checks if new tile has a bomb or block
            player.revertMovement(direction);
            return false;
        }
        // else
        this._grid.removeFromTile(originalGridPos.row, originalGridPos.col, 'player')
        this._grid.addToTile(player.row, player.col, 'player', id);
        return true;
    }

    placeBomb(playerId) {
        //find player index in players array
        //check if that player has bombs, otherwise return
        //decrement players bombs
        //make bomb object giving player row! and col! and id
        //push bomb obj to array
        //add bomb to grid at row and col
    }

    explodeBomb(bombId) {

    }
}

// Export //
module.exports = Game;


// Helper Functions //
function _findIndexById(array, id) {
    var index = array.findIndex(function (currentObj) {
        return currentObj.id === id;
    });
    return index;
}