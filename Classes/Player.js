// Global Variables //
var STARTING_BOMBS = 3;
var MAX_SPEED = 10;

var PRESSING = {
    UP : "up", 
    DOWN : "down", 
    LEFT : "left", 
    RIGHT : "right", 
    BOMB : "bomb",
    NONE: "none" 
  };
  
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
        this._pressing = PRESSING.NONE;
        this._pressingUp = false;
        this._pressingDown = false;
        this._pressingBomb = false;
        this._maxSpd = MAX_SPEED;
        this._score = 0;
        this._username = id;
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
    get pressingBomb() {
        return this._pressingBomb;
    }
    get maxSpd() {
        return this._maxSpd;
    }
    get score() {
        return this._score;
    }
    get username() {
        return this._username;
    }

    // Setters //
    set bombCount(newCount) {
        this._bombCount = newCount;
    }
    set isDead(newBool) {
        this._isDead = newBool;
    }
    set score(newscore) {
        this._score = newscore;
    }
    set username(newUsername) {
        this._username = newUsername;
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
            case "bomb":
                this._pressingBomb = keyState;
                break;
            default:
                break;
        }
    }

    movePosition() {
        if (this.pressingLeft)
            this.x -= MAX_SPEED;

        if (this.pressingRight)
            this.x += MAX_SPEED;

        if (this.pressingUp)
            this.y -= MAX_SPEED;

        if (this.pressingDown)
            this.y += MAX_SPEED;
    }

    revertMovement() {
        if (this.pressingLeft)
            this.x += MAX_SPEED;

        if (this.pressingRight)
            this.x -= MAX_SPEED;

        if (this.pressingUp)
            this.y += MAX_SPEED;

        if (this.pressingDown)
            this.y -= MAX_SPEED;
    }
}

// Export //
module.exports = Player;