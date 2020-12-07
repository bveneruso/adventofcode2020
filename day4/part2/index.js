const utils = require('../../utils/utils');

const regexPrefix = '(^|\\s)'; // Start with whitespace or string start
const regexPostfix = '(\\s|$)'; // End with whitepsace or string end
const regex = [
    'byr:((19[2-9][0-9])|(200[0-2]))', // birth year regex, beetwn 1920 and 2002
    'iyr:((201[0-9])|2020)', // issue year, between 2010 and 2020
    'eyr:((202[0-9])|2030)', // expiration year, between 2020 and 2030
    'hgt:((((1[5-8][0-9])|(19[0-3]))cm)|(((59)|(6[0-9])|(7[0-6]))in))', // height, if cm, must be between 150 and 193, if in, must be between 59 and 76
    'hcl:#([0-9a-f]{6})', // hair color, a # followed by exactly six characters 0-9 or a-f.
    'ecl:(amb|blu|brn|gry|grn|hzl|oth)', //eye color, exactly one of: amb blu brn gry grn hzl oth
    'pid:([0-9]{9})', //pid, a nine-digit number, including leading zeroes
];

let isValidPassport = function(input) {
    input = input.trim();
    for(let r of regex) {
        if(input.match(new RegExp(`${regexPrefix}${r}${regexPostfix}`)) == null) {
            return false;
        }
    }
    return true;
};

let validCount = 0;
utils.parseFile('./input.txt', null, function (group) {
    if(isValidPassport(group.join(' ')))
        validCount++;
}, function() {
    return validCount;
});

// Answer is 156



