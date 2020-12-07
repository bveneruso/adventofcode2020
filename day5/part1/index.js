const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);

let getSeatId = function(boardingPass, rows, columns) {
    let minRow = 0;
    let maxRow = rows - 1;
    let minCol = 0;
    let maxCol = columns - 1;
    for(let i = 0; i < boardingPass.length; i++) {
        switch(boardingPass.charAt(i)) {
            case 'F': {
                // take lower half (lower rows)
                let range = maxRow - minRow;
                maxRow -= Math.ceil(range / 2);
                //console.log(boardingPass + ' on letter ' + boardingPass.charAt(i) + ' taking lower half, new range is ' + minRow + '-' + maxRow);
                break;
            }
            case 'B': {
                // take upper half (upper rows)
                let range = maxRow - minRow;
                minRow += Math.ceil(range / 2);
                //console.log(boardingPass + ' on letter ' + boardingPass.charAt(i) + ' taking upper half, new range is ' + minRow + '-' + maxRow);
                break;
            }
            case 'R': {
                // keep the upper columns
                let range = maxCol - minCol;
                minCol += Math.ceil(range / 2);
                //console.log(boardingPass + ' on letter ' + boardingPass.charAt(i) + ' taking right half, new range is ' + minRow + '-' + maxRow);
                break;
            }
            case 'L': {
                // keep the lower columns
                let range = maxCol - minCol;
                maxCol -= Math.ceil(range / 2);
                //console.log(boardingPass + ' on letter ' + boardingPass.charAt(i) + ' taking left half, new range is ' + minRow + '-' + maxRow);
                break;
            }
        }
    }
    if(minRow == maxRow && minCol == maxCol) {
        let id = minRow * 8 + minCol;
        console.log(boardingPass + ': Row ' + minRow + ', Col ' + minCol + ', ID: ' + id);
        return id;
    }
};

let highestSeatId = 0;
eachLine('./input.txt', function(line) {
    let id = getSeatId(line.trim(), 128, 8);
    if(id > highestSeatId) {
        highestSeatId = id;
    }
}).then(function(err) {
    console.log(highestSeatId);
});




