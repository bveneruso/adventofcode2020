const utils = require('../../utils/utils');
let saidYesTo = new Set();

let parseLine = function(line) {
    utils.forEachChar(line, function(char) {
        saidYesTo.add(char);
    });
};

let sum = 0;
utils.parseFile('./input.txt', function(line) {
    parseLine(line);
}, function() {
    sum += saidYesTo.size;
    saidYesTo = new Set();
}, function() {
    return sum;
});

// Answer is 6437
