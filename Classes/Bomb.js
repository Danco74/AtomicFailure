// Global Variables //
var EXPLOSION_RADIUS = 2;
var TIMER = 2;

// Imports //
var Entity = require('./Entity');

// Class //
class Bomb extends Entity{
    constructor(id, row, col) {
        super(id, row, col);
        this._radius = EXPLOSION_RADIUS;
        this._timer = TIMER;
    }

    // Getters //
    get radius() {
        return this._radius;
    }
    get timer() {
        return this._timer;
    }

    // Other Methods //
}

// Export //
module.exports = Bomb;

// Helper Functions //