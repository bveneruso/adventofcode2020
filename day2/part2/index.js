const utils = require('../../utils/utils');
const requirementParser = new RegExp('^(?<min>\\d*)\\-(?<max>\\d*) (?<letter>[a-zA-Z])$');
let validCount = 0;

let passwordIsValid = function(requirements, pswd) {
    let rInfo = requirements.match(requirementParser).groups;
    let letter = rInfo.letter;
    return (utils.charAt(pswd, rInfo.min - 1) === letter ? 1 : 0) + (utils.charAt(pswd, rInfo.max - 1) === letter ? 1 : 0) == 1;
};

utils.parseFile('./input.txt', function(line) {
    let [reqs, pass] = line.trim().split(':');
    if (passwordIsValid(reqs.trim(), pass.trim()))
        validCount++;
}, null, function() {
    return validCount;
});

// Answer is 335
