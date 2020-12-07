const utils = require('../../utils/utils');

let getSeatId = function(boardingPass, rows, columns) {
    let minRow = 0;
    let maxRow = rows - 1;
    let minCol = 0;
    let maxCol = columns - 1;
    utils.forEachChar(boardingPass, function(char) {
        switch(char) {
            case 'F': {
                // take lower half (lower rows)
                maxRow -= Math.ceil((maxRow - minRow) / 2);
                break;
            }
            case 'B': {
                // take upper half (upper rows)
                minRow += Math.ceil((maxRow - minRow) / 2);
                break;
            }
            case 'R': {
                // keep the upper columns
                minCol += Math.ceil((maxCol - minCol) / 2);
                break;
            }
            case 'L': {
                // keep the lower columns
                maxCol -= Math.ceil((maxCol - minCol) / 2);
                break;
            }
        }
    });
    return minRow * 8 + minCol;
};

let highestSeatId = 0;

utils.parseFile('./input.txt', function(line) {
    highestSeatId = Math.max(highestSeatId, getSeatId(line.trim(), 128, 8));
}, null, function() {
   return highestSeatId;
});

// Answer is 922
