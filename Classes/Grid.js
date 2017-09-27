// Global Variables //
var ROW_NUMBER = 15;
var COL_NUMBER = 20;

// Class //
class Grid {
    constructor() {
        this._matrix = _matrixArray(ROW_NUMBER, COL_NUMBER); // Abstract/Dynamic objects
    }

    // Other Methods //
    getTileObject(row, col) {
        return this._matrix[row][col];
    }

    removeFromTile(row, col, objName) { // objName = 'player' | 'bomb' | 'explosion' | 'block'
        delete this._matrix[row][col][objName]; 
    }

    addToTile(row, col, objName, id) { // objName = 'player' | 'bomb' | 'explosion' | 'block'
        this._matrix[row][col][objName] = id; 
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