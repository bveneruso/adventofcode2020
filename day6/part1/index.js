const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);
let saidYesTo = {};

let parseLine = function(line) {
    for(let i = 0; i < line.length; i++) {
        let char = line.charAt(i);
        if(!saidYesTo.hasOwnProperty(char)) {
            saidYesTo[char] = 1;
        }
    }
};

let sum = 0;
eachLine('./input.txt', function(line) {
    if(line.trim().length == 0) {
        sum += Object.keys(saidYesTo).length;
        saidYesTo = {};
    } else {
        parseLine(line.trim());
    }
}).then(function(err) {
    sum += Object.keys(saidYesTo).length;
    console.log(sum);
});




