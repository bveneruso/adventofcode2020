const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);

let regex = new RegExp('^(?=[\\s\\S]*byr)(?=[\\s\\S]*iyr)(?=[\\s\\S]*eyr)(?=[\\s\\S]*hgt)(?=[\\s\\S]*hcl)(?=[\\s\\S]*ecl)(?=[\\s\\S]*pid)[\\s\\S]+$');

let isValidPassport = function(input) {
    input = input.trim();
    //console.log('\n------Checking passport ' + input + '\n---------');
    return (input.match(regex) || []).length == 1;
};

let validCount = 0;
let partialLine = '';
eachLine('./input.txt', function(line) {
    if(line.trim() == 0) {
        if(isValidPassport(partialLine)) {
            validCount++;
        }
        partialLine = '';
    } else {
        partialLine += "\n" + line.trim();
    }
}).then(function(err) {
    if(isValidPassport(partialLine)) {
        validCount++;
    }
    console.log(validCount);
});




