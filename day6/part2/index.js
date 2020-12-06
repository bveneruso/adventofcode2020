const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);
let saidYesTo = [];

let parseLine = function(line, isFirstLine) {

    let set = [];
    for (let i = 0; i < line.length; i++) {
        set.push(line.charAt(i));
    }

    if(isFirstLine) {
        saidYesTo = set;
        isFirst = false;
    } else {
        saidYesTo = saidYesTo.filter(val => set.includes(val));
    }
};

let sum = 0;
let isFirst = true;
eachLine('./input.txt', function(line) {
    if(line.trim().length == 0) {
        sum += saidYesTo.length;
        saidYesTo = {};
        isFirst = true;
    } else {
        parseLine(line.trim(), isFirst);
    }
}).then(function(err) {
    sum += saidYesTo.length;
    console.log(sum);
});




