const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);

let validCount = 0;
let requirementParser = new RegExp('^(?<min>\\d*)\\-(?<max>\\d*) (?<letter>[a-zA-Z])$');

let passwordIsValid = function(requirements, password) {
    let requirementInfo = requirements.match(requirementParser).groups;
    let min = requirementInfo.min;
    let max = requirementInfo.max;
    let letter = requirementInfo.letter;
    let letterRegex = new RegExp(letter, 'g');
    let count = (password.match(letterRegex) || []).length;
    let valid = (count >= min && count <= max)
    //console.log('Password ' + password + ' has validity of ' + valid + ' and has ' + count + ' ' + letter + '\'s and has requirements of ' + requirements);
    return valid;
};

eachLine('./input.txt', function(line) {
    let split = line.trim().split(':');
    let reqs = split[0].trim();
    let pass = split[1].trim();
    let valid = passwordIsValid(reqs, pass);
    if (valid) {
        validCount++;
    }
}).then(function(err) {
    console.log(validCount);
});
