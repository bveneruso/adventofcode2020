const lineReader = require('line-reader');

let inputMap = {};

// Find two numbers that sum to 2020
lineReader.eachLine('./input.txt', function(line) {
    let numb = Number(line);
    inputMap[numb] = 1;
    let desiredNumb = 2020 - numb;
    if (inputMap.hasOwnProperty(desiredNumb)) {
        console.log(numb * desiredNumb);
        return false;
    }
});
