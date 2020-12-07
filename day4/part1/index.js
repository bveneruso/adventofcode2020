const utils = require('../../utils/utils');

let regex = new RegExp('^(?=[\\s\\S]*byr)(?=[\\s\\S]*iyr)(?=[\\s\\S]*eyr)(?=[\\s\\S]*hgt)(?=[\\s\\S]*hcl)(?=[\\s\\S]*ecl)(?=[\\s\\S]*pid)[\\s\\S]+$');

let isValidPassport = function(input) {
    input = input.trim();
    return (input.match(regex) || []).length == 1;
};

let validCount = 0;
utils.parseFile('./input.txt', null, function (group) {
    if(isValidPassport(group.join(' ')))
        validCount++;
}, function() {
    return validCount;
});

// Answer is 230


