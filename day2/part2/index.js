const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);

let validCount = 0;
let requirementParser = new RegExp('^(?<min>\\d*)\\-(?<max>\\d*) (?<letter>[a-zA-Z])$');

let passwordIsValid = function(requirements, password) {
    let requirementInfo = requirements.match(requirementParser).groups;
    let firstPos = requirementInfo.min;
    let secondPos = requirementInfo.max;
    let letter = requirementInfo.letter;
    let firstLetter = password.length >= firstPos && firstPos > 0 ? password.charAt(firstPos -1): '';
    let secondLetter = password.length >= secondPos && secondPos > 0 ? password.charAt(secondPos -1): '';
    let matches = ((firstLetter === letter) ? 1 : 0) + ((secondLetter === letter) ? 1 : 0);
    return matches == 1;
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
