// Global Variables //
var GRID_PIXEL_CONVERSION = 64;

// Class //
class Entity {
    constructor(id, row, col) {
        this._id = id;
        this._row = row;
        this._col = col;
        this._x = col * GRID_PIXEL_CONVERSION;
        this._y = row * GRID_PIXEL_CONVERSION;
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
    get row() {
        return this._row;
    }
    get col() {
        return this._col;
    }

    // Setters //
    set x(newPos) {
        this._x = newPos;
        this._col = Math.round(this._x / GRID_PIXEL_CONVERSION);
    }
    set y(newPos) {
        this._y = newPos;
        this._row = Math.round(this._y / GRID_PIXEL_CONVERSION);
    }

    // Other Methods //
}

// Export //
module.exports = Entity;