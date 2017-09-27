// Global Variables //
var STARTING_BOMBS = 3;
var MAX_SPEED = 10;

// Imports //
var Entity = require('./Entity');

// Class //
class Player extends Entity{
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
    movePosition(direction, keyState) {
        switch (direction) {
            case "left":
                this._x-=MAX_SPEED;
                break;
            case "right":
                this._x+=MAX_SPEED;
                break;
            case "up":
                this._y-=MAX_SPEED;
                break;
            case "down":
                this._y+=MAX_SPEED;
                break;
            default:
                break;
        }
    }

    revertMovement(direction) {
        switch (direction) {
            case "left":
                this._x+=MAX_SPEED;
                break;
            case "right":
                this._x-=MAX_SPEED;
                break;
            case "up":
                this._y+=MAX_SPEED;
                break;
            case "down":
                this._y-=MAX_SPEED;
                break;
            default:
                break;
        }
    }
}

// Export //
module.exports = Player;