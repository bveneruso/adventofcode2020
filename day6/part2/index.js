const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);
let saidYesTo = [];
let sum = 0;
let isFirst = true;

let parseLine = function(line) {
    let set = [];
    for (let i = 0; i < line.length; i++) {
        set.push(line.charAt(i));
    }

    saidYesTo = isFirst ? set : saidYesTo.filter(val => set.includes(val));
    isFirst = false;
};


eachLine('./input.txt', function(line) {
    if(line.trim().length == 0) {
        sum += saidYesTo.length;
        saidYesTo = {};
        isFirst = true;
    } else {
        parseLine(line.trim());
    }
}).then(function(err) {
    sum += saidYesTo.length;
    console.log(sum);
});




