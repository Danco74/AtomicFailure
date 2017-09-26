// Global Variables //
ROW_NUMBER = 15;
COL_NUMBER = 20;

// Class //
class Map {
    constructor() {
        this.grid = _gridArray(ROW_NUMBER, COL_NUMBER); // {contains: {obj} }
    }

    // Other Methods //
    removeFromSquare(row, col, objName) { // objName = 'player' | 'bomb' | 'explosion' | 'block'
        delete this.grid[row][col][objName]; 
    }

    placePlayer(row, col, id) {
        this.grid[row][col].player = id;
    }

    placeBomb(row, col, id) {
        this.grid[row][col].bomb = id;
    }
    
    placeExplosion(row, col, id) {
        this.grid[row][col].explosion = id;
    }

    placeBlock(row, col, id) {
        this.grid[row][col].block = id;
    }
}

// Export //
module.exports = Map;

// Helper Functions //
function _gridArray(rows, cols) {
    var grid = new Array();

    for (i = 0; i < rows; i++) {
     grid[i] = new Array();
     for (j = 0; j < cols; j++) {
      grid[i][j] = {};
     }
    }

    return grid;
}