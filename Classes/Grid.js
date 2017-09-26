// Global Variables //
var ROW_NUMBER = 15;
var COL_NUMBER = 20;

// Class //
class Grid {
    constructor() {
        this._matrix = _matrixArray(ROW_NUMBER, COL_NUMBER); // {contains: {obj} }
    }

    // Other Methods //
    removeFromSquare(row, col, objName) { // objName = 'player' | 'bomb' | 'explosion' | 'block'
        delete this._matrix[row][col][objName]; 
    }

    placePlayer(row, col, id) {
        this._matrix[row][col].player = id;
    }

    placeBomb(row, col, id) {
        this._matrix[row][col].bomb = id;
    }
    
    placeExplosion(row, col, id) {
        this._matrix[row][col].explosion = id;
    }

    placeBlock(row, col, id) {
        this._matrix[row][col].block = id;
    }
}

// Export //
module.exports = Grid;

// Helper Functions //
function _matrixArray(rows, cols) {
    var matrix = new Array();

    for (i = 0; i < rows; i++) {
     matrix[i] = new Array();
     for (j = 0; j < cols; j++) {
      matrix[i][j] = {};
     }
    }

    return matrix;
}