const lineReader = require('line-reader');

let inputMap = {}

lineReader.eachLine('./input.txt', function(line) {
    let numb = Number(line)
    inputMap[numb] = 1;
    let desiredNumb = 2020 - numb;
    if (inputMap.hasOwnProperty(desiredNumb)) {
        console.log(numb * desiredNumb);
        return false;
    }
});
