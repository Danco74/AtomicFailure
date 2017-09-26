// Global Variables //
var EXPLOSION_RADIUS = 2;
var TIMER = 2;

// Class //
class Bomb extends Entity{
    constructor(id, xPos, yPos) {
        super(id, xPos, yPos);
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