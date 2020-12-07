const utils = require('../../utils/utils');
const requirementParser = new RegExp('^(?<min>\\d*)\\-(?<max>\\d*) (?<letter>[a-zA-Z])$');
let validCount = 0;

let passwordIsValid = function(requirements, password) {
    let reqInfo = requirements.match(requirementParser).groups;
    let letterRegex = new RegExp(reqInfo.letter, 'g');
    let count = (password.match(letterRegex) || []).length;
    return (count >= reqInfo.min && count <= reqInfo.max);
};

utils.parseFile('./input.txt', function(line) {
    let [reqs, pass] = line.trim().split(':');
    if (passwordIsValid(reqs.trim(), pass.trim()))
        validCount++;
}, null, function() {
   return validCount;
});

// Answer is 591
