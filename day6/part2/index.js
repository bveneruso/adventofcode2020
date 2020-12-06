const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);
let saidYesTo = {};

let parseLine = function(line, isFirstLine) {

    if(isFirst) {

        // If first element in group, initialize said yes to char array
        for (let i = 0; i < line.length; i++) {
            let char = line.charAt(i);
            saidYesTo[char] = 1;
        }
        isFirst = false;
    } else {

        let keysToDelete = [];
        for (let key of Object.keys(saidYesTo)) {
            if(line.indexOf(key) == -1) {
                keysToDelete.push(key);
            }
        }
        for(let key of keysToDelete) {
            delete saidYesTo[key];
        }
    }
};

let sum = 0;
let isFirst = true;
eachLine('./input.txt', function(line) {
    if(line.trim().length == 0) {
        sum += Object.keys(saidYesTo).length;
        saidYesTo = {};
        isFirst = true;
    } else {
        parseLine(line.trim(), isFirst);
    }
}).then(function(err) {
    sum += Object.keys(saidYesTo).length;
    console.log(sum);
});




