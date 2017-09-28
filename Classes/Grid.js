// Global Variables //
var ROW_NUMBER = 12;
var COL_NUMBER = 12;

// Class //
class Grid {
    constructor() {
        this._matrix = _matrixArray(ROW_NUMBER, COL_NUMBER); // Abstract/Dynamic objects
    }

    // Other Methods //
    getTileObject(row, col) {
        if( (row < 0) || (row > ROW_NUMBER - 1) || (col < 0) || (col > COL_NUMBER - 1) )
            return false;
        return this._matrix[row][col];
    }

    removeFromTile(row, col, objName) { // objName = 'player' | 'bomb' | 'explosion' | 'block'
        delete this._matrix[row][col][objName]; 
    }

    addToTile(row, col, objName, id) { // objName = 'player' | 'bomb' | 'explosion' | 'block'
        this._matrix[row][col][objName] = id; 
    }

    getGridDimensions(){
        return {row:ROW_NUMBER,col:COL_NUMBER};
    }

    setImpassableRow(row, id){
        for(var i = 0; i < this._matrix[row].length; i++) {
            this._matrix[row][i]["block"] = id;
        }
    }

    randomGridPlacement(){
        var random = _randomGridSelection();
        while(this._matrix[random.row][random.col].hasOwnProperty('block')) {
            random = _randomGridSelection();
        }
        return random;
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

function _randomGridSelection() {
    var random = {};
    random.row = Math.floor(Math.random()*ROW_NUMBER);
    random.col = Math.floor(Math.random()*COL_NUMBER);
    return random;
}