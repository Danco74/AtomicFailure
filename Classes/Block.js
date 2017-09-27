// Imports //
var Entity = require('./Entity');

// Class //
class Block extends Entity{
    constructor(id, xPos, yPos) {
        super(id, xPos, yPos);
    }
}

// Export //
module.exports = Block;