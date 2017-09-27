
// Imports //
var Entity = require('./Entity');

// Class //
class Explosion extends Entity{
    constructor(id, col, row, refId) {
        super(id, col, row);
        this._refId = refId;
    }

    get refId(){
        return this._refId;
    }
}

// Export //
module.exports = Explosion;