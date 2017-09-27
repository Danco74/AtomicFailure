// Imports //
var Entity = require('./Entity');

// Class //
class Block extends Entity{
    constructor(id, row, col) {
        super(id, row, col);
    }
}

// Export //
module.exports = Block;