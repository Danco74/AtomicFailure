var TIMER = 16;

// Imports //
var Entity = require('./Entity');

// Class //
class Explosion extends Entity{
    constructor(id, col, row, refId) {
        super(id, col, row);
        this._refId = refId;
        this._timer = TIMER;
    }

    get refId(){
        return this._refId;
    }
    get timer(){
        return this._timer;
    }

    decreaseTimer(){
        this._timer--;
        return this._timer;
    }
}

// Export //
module.exports = Explosion;