// Global Variables //
var STARTING_BOMBS = 3;
var MAX_SPEED = 10;

// Imports //
var Entity = require('./Entity');

// Class //
class Player extends Entity {
    constructor(id, row, col) {
        super(id, row, col);
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

    // Other Methods //
    updateKeyPresses(direction, keyState) {
        switch (direction) {
            case "left":
                this._pressingLeft = keyState;
                break;
            case "right":
                this._pressingRight = keyState;
                break;
            case "up":
                this._pressingUp = keyState;
                break;
            case "down":
                this._pressingDown = keyState;
                break;
            default:
                break;
        }
    }

    movePosition() {
        if (this._pressingLeft)
            this._x -= MAX_SPEED;

        if (this._pressingRight)
            this._x += MAX_SPEED;

        if (this._pressingUp)
            this._y -= MAX_SPEED;

        if (this._pressingDown)
            this._y += MAX_SPEED;
    }

    revertMovement() {
        if (this._pressingLeft)
            this._x += MAX_SPEED;

        if (this._pressingRight)
            this._x -= MAX_SPEED;

        if (this._pressingUp)
            this._y += MAX_SPEED;

        if (this._pressingDown)
            this._y -= MAX_SPEED;
    }
}

// Export //
module.exports = Player;