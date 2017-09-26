// Global Variables //
var STARTING_BOMBS = 3;
var MAX_SPEED = 10;

// Imports //
var Entity = require('./Entity');

// Class //
class Player extends Entity{
    constructor(id, xPos, yPos) {
        super(id, xPos, yPos);
        this._bombCount = STARTING_BOMBS;
        this._isDead = false;
        this._pressingRight = false;
        this._pressingLeft = false;
        this._pressingUp = false;
        this._pressingDown = false;
        this._maxSpd = MAX_SPEED;
    }

    // Getters //
    get bombCount() {
        return this._bombCount;
    }
    get isDead() {
        return this._isDead;
    }
    get pressingRight() {
        return this._pressingRight;
    }
    get pressingLeft() {
        return this._pressingLeft;
    }
    get pressingUp() {
        return this._pressingUp;
    }
    get pressingDown() {
        return this._pressingDown;
    }
    get maxSpd() {
        return this._maxSpd;
    }

    // Setters //
    set bombCount(newCount) {
        this._bombCount = newCount;
    }
    set isDead(newBool) {
        this._isDead = newBool;
    }
    set pressingRight(newBool) {
        this._pressingRight = newBool;
    }
    set pressingLeft(newBool) {
        this._pressingLeft = newBool;
    }
    set pressingUp(newBool) {
        this._pressingUp = newBool;
    }
    set pressingDown(newBool) {
        this._pressingDown = newBool;
    }

    // Other Methods //
    updatePosition() {
        if(pressingRight) {
            this._x += 1;
        }
        if(pressingLeft) {
            this._x -= 1;
        }
        if(pressingUp) {
            this._y -= 1;
        }
        if(pressingDown) {
            this._y += 1;
        }
    }
}

// Export //
module.exports = Player;