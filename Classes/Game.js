// Imports //
var Grid = require('./Grid');
var Player = require('./Player');
var Bomb = require('./Bomb');
var Block = require('./Block');
var Explosion = require('./Explosion');

// Class //
class Game {
    constructor() {
        this._players = []; // Player objects
        this._bombs = []; // Bomb objects
        this._explosions = []; //Blasts objects
        this._blocks = []; // Block objects
        this._grid = new Grid();
    }

    // Getters //
    get players() {
        return this._players;
    }
    get bombs() {
        return this._bombs;
    }

    get explosions() {
        return this._explosions;
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
        if (index < 0 || index >= this._players.length)
            return false;
        this._players.splice(index, 1);
    }

    updateKeys(id, direction, state) {
        var index = _findIndexById(this._players, id);
        if (index < 0 || index >= this._players.length)
            return false;
        var player = this._players[index];
        player.updateKeyPresses(direction, state);
    }

    checkDeath(id) {
        var index = _findIndexById(this._players, id);
        var player = this._players[index];
        var tileObject = this._grid.getTileObject(player.row, player.col);
        if (tileObject.hasOwnProperty('explosion')) {
            player.isDead = true;
            var killerIndex = _findIndexById(this._players, tileObject.explosion);
            this._players[killerIndex].points++;
            return true;
        }
        return false;
    }

    killPlayer(id) {
        var index = _findIndexById(this._players, id);
        if (index < 0 || index >= this._players.length)
            return false;
        this._players.splice(index, 1);
    }

    movePlayer(id) {
        var index = _findIndexById(this._players, id);
        var player = this._players[index];
        this.checkDeath(id);
        if (player.isDead)
            return false;
        var originalGridPos = {
            row: player.row,
            col: player.col
        }
        player.movePosition();
        var inSameTile = ((player.row === originalGridPos.row) && (player.col === originalGridPos.col))
        var tileObject = this._grid.getTileObject(player.row, player.col); // will return false if out of bounds
        if (!tileObject) {
            player.revertMovement();
            return false;
        }
        if (!inSameTile && (tileObject.hasOwnProperty('block') || tileObject.hasOwnProperty('bomb'))) { // Checks if new tile has a bomb or block
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
        if (!player.pressingBomb)
            return false;
        //check if that player has bombs, otherwise return
        if (player.bombCount === 0)
            return false;
        //check if grid location has bomb already (duplicates)
        if (this._grid.getTileObject(player.row, player.col).hasOwnProperty('bomb'))
            return false;
        //decrement players bombs
        player.bombCount--;
        //make bomb object giving player row! and col! and id
        var newBomb = new Bomb(playerId, player.row, player.col, Math.random());
        //push bomb obj to array
        this._bombs.push(newBomb);
        //add bomb to grid at row and col
        this._grid.addToTile(player.row, player.col, 'bomb', playerId);
        return true;
    }

    //Create the explosion object
    createExplosion(playerId, row, col, radius) {
        var gridDimensions = this._grid.getGridDimensions();

        var explosion = new Explosion(playerId, row, col, Math.random());
        this._grid.addToTile(row, col, 'explosion', playerId);
        this._explosions.push(explosion);

        for (var i = 1; i <= radius; i++) {
            if (row + i <= gridDimensions.row) {
                var explosion = new Explosion(playerId, row + i, col, Math.random());
                this._grid.addToTile(row + i, col, 'explosion', playerId);
                this._explosions.push(explosion);
            }
            if (row - i >= 0) {
                var explosion = new Explosion(playerId, row - i, col, Math.random());
                this._grid.addToTile(row - i, col, 'explosion', playerId);
                this._explosions.push(explosion);
            }
            if (col + i <= gridDimensions.col) {
                var explosion = new Explosion(playerId, row, col + i, Math.random());
                this._grid.addToTile(row, col + i, 'explosion', playerId);
                this._explosions.push(explosion);
            }
            if (col - i >= 0) {
                var explosion = new Explosion(playerId, row, col - i, Math.random());
                this._grid.addToTile(row, col - i, 'explosion', playerId);
                this._explosions.push(explosion);
            }
        }

    }

    removeExplosion(refId, row, col) {
        var playerId = null;
        for (var i = 0; i < this._explosions.length; i++) {
            var explosion = this._explosions[i];
            if (explosion.refId == refId) {
                playerId = this._explosions[i].id;
                this._explosions.splice(i, 1);
                this._grid.removeFromTile(row, col, 'explosion');
            }
        }
    }


    //Handle bomb explosion
    explodeBomb(bombId) {
        for (var i = 0; i < this._bombs.length; i++) {
            var bomb = this._bombs[i];
            if (bomb.refId == bombId) {
                var bombRow = bomb.row;
                var bombCol = bomb.col;
                var explosionRadius = bomb.radius;
                this._grid.removeFromTile(bombRow, bombCol, 'bomb');
                var playerIndex = _findIndexById(this._players, bomb.id);
                this._bombs.splice(i, 1);
                this.createExplosion(bomb.id, bombRow, bombCol, explosionRadius);

                if (playerIndex >= 0 && playerIndex < this._players.length) {
                    this.players[playerIndex].bombCount++;
                    console.log(this.players[playerIndex].bombCount);
                }
            }
        }
    }

    //Update all bomb timers
    updateBombTimers() {
        for (var i = 0; i < this._bombs.length; i++) {
            var isTimerZero = this._bombs[i].decreaseTimer();
            if (isTimerZero == 0) {
                this.explodeBomb(this._bombs[i].refId);
            }
        }
    }

    //Update all bomb timers
    updateExplosionTimers() {
        for (var i = 0; i < this._explosions.length; i++) {
            var explosion = this._explosions[i];
            var isTimerZero = explosion.decreaseTimer();
            if (isTimerZero == 0) {
                this.removeExplosion(explosion.refId, explosion.row, explosion.col);
            }
        }
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