const utils = require('../../utils/utils');
let set = new Set();

utils.parseFile('./input.txt', function (line) {
    let n = Number(line);
    set.add(n);
    let desired = 2020 - n;
    if(set.has(desired)) {
        console.log(n * desired);
        return false;
    }
});

// Correct answer is 972576
