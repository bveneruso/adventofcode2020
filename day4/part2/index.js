const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);

// This regex is painful and it makes me cry, but I was determined to get it to work with regex
let regex = new RegExp('^(?=[\\s\\S]*byr:(?<byr>\\d{4}))(?=[\\s\\S]*iyr:(?<iyr>\\d{4}))(?=[\\s\\S]*eyr:(?<eyr>\\d{4}))(?=[\\s\\S]*hgt:(?<hgt>\\d{2,3}(in|cm)))(?=[\\s\\S]*hcl:#(?<hcl>[0-9a-f]{6}))(?=[\\s\\S]*ecl:(?<ecl>(amb|blu|brn|gry|grn|hzl|oth)))[\\s\\S]+$');

let pidRegex = new RegExp('^(?=[\\s\\S]*pid:(?<pid>[0-9]{9}(\\s|$)))[\\s\\S]+$');

let isInRange = function(number, min, max) {
    return Number(number) >= min && Number(number) <= max;
};

let isValidPassport = function(input) {
    input = input.trim();
    let match = input.match(regex);
    if(match == null) return false;
    let passportInfo = match.groups;

    let pidMatch = input.match(pidRegex);
    if(pidMatch == null) {
        if(input.indexOf('pid:') != -1) {
            console.log("\nFailed PID match with pid of " + input.substr(input.indexOf('pid:'), 20));
        }
        return false;
    }

    if(!isInRange(passportInfo.byr, 1920, 2002)) return false;
    if(!isInRange(passportInfo.iyr, 2010, 2020)) return false;
    if(!isInRange(passportInfo.eyr, 2020, 2030)) return false;
    if(passportInfo.hgt.trim().endsWith('cm')) {
        let height = Number(passportInfo.hgt.trim().replace('cm',''));
        if(!isInRange(height, 150, 193)) return false;
    } else if(passportInfo.hgt.trim().endsWith('in')) {
        let height = Number(passportInfo.hgt.trim().replace('in',''));
        if(!isInRange(height, 59, 76)) return false;
    } else {
        return false;
    }


    return true;
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




