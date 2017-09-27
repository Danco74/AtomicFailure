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
    get bombs() {
        return this._bombs;
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

    updateKeys(id, direction, state) {
        var index = _findIndexById(this._players, id);
        var player = this._players[index];
        player.updateKeyPresses(direction, state);
    }

    movePlayer(id) {
        var index = _findIndexById(this._players, id);
        var player = this._players[index];
        var originalGridPos = {row: player.row, col: player.col}
        player.movePosition();
        var inSameTile = ( (player.row === originalGridPos.row) && (player.col === originalGridPos.col) )
        var tileObject = this._grid.getTileObject(player.row, player.col); // will return false if out of bounds
        if(!tileObject) {
            player.revertMovement();
            return false;
        }
        if ( !inSameTile && (tileObject.hasOwnProperty('block') || tileObject.hasOwnProperty('bomb')) ) { // Checks if new tile has a bomb or block
            player.revertMovement();
            return false;
        }
        // else
        this._grid.removeFromTile(originalGridPos.row, originalGridPos.col, 'player')
        this._grid.addToTile(player.row, player.col, 'player', id);
        return true;
    }

    placeBomb(playerId) {
        //find player index in players array
        var index = _findIndexById(this._players, playerId);
        var player = this._players[index];
        //check if player pressed enter
        if(!player.pressingBomb)
            return false;
        //check if that player has bombs, otherwise return
        if(player.bombCount === 0)
            return false;
        //decrement players bombs
        player.bombCount--;
        //make bomb object giving player row! and col! and id
        var newBomb = new Bomb(playerId, player.row, player.col);
        //push bomb obj to array
        this._bombs.push(newBomb);
        //add bomb to grid at row and col
        this._grid.addToTile(player.row, player.col, 'bomb', playerId);
        return true;
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