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

    movePlayer(id, direction) {
        var index = _findIndexById(this._players, id);
        var newCoordinates = { x: this._players[index].x, y: this._players[index].y };
        _movePosition(direction, newCoordinates); // Updates newCoordinates
        var tileObject = this._grid.getTileObject(newCoordinates.x, newCoordinates.y);

        if (tileObject.block || tileObject.bomb) { // Checks if new tile has a bomb or block
            return false;
        }
        // else
        this._grid.removeFromTile(this._players[index].x, this._players[index].y, 'player')
        this._grid.addToTile(newCoordinates.x, newCoordinates.y, 'player', id);
        this._players[index].x = newCoordinates.x;
        this._players[index].y = newCoordinates.y;
        return true;
    }

    placeBomb(playerId) {

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

function _movePosition(direction, coordinates) {
    switch (direction) {
        case "left":
            coordinates.x--;
            break;
        case "right":
            coordinates.x++;
            break;
        case "up":
            coordinates.y++;
            break;
        case "down":
            coordinates.y--;
            break;
        default:
            break;
    }
}