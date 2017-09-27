// Global Variables //
var EXPLOSION_RADIUS = 2;
var TIMER = 33;

// Imports //
var Entity = require('./Entity');

// Class //
class Bomb extends Entity{
    constructor(id, row, col,refId) {
        super(id, row, col);
        this._radius = EXPLOSION_RADIUS;
        this._timer = TIMER;
        this._refId;

    }

    // Getters //
    get radius() {
        return this._radius;
    }
    get timer() {
        return this._timer;
    }
    get refId(){
        return this._refId;
    }

    // Other Methods //

    //Decrease time by one
    decreaseTimer(){
        this._timer--;
        return this._timer;
    }

    

    

}

// Export //
module.exports = Bomb;

// Helper Functions //