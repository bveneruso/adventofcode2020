const utils = require('../../utils/utils');
let saidYesTo = new Set();

let parseLine = function(line, lineInFile, lineInGroup) {
    let answers = new Set();
    utils.forEachChar(line, function(char) {
        answers.add(char);
    });
    if(lineInGroup == 0)
        saidYesTo = answers;
    saidYesTo = new Set([...saidYesTo].filter(x => answers.has(x)));
};

let sum = 0;
utils.parseFile('./input.txt', parseLine, function() {
    sum += saidYesTo.size;
    saidYesTo = new Set();
}, function() {
    return sum;
});

// Answer is 3229


