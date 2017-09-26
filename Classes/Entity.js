// Class //
class Entity {
    constructor(id, xPos, yPos) {
        this._id = id;
        this._x = xPos;
        this._y = yPos;
    }

    // Getters //
    get id() {
        return this._id;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }

    // Setters //
    set x(newPos) {
        this._x = newPos;
    }
    set y(newPos) {
        this._y = newPos;
    }

    // Other Methods //
}

// Export //
module.exports = Entity;