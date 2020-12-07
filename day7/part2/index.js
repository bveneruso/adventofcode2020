const utils = require('../../utils/utils');
const regex = new RegExp('\\d \\S* \\S*', 'g');

let bagMap = {}; // where each element points to a map of contained bag colors to numbers

let handleEachLine = function(line, lineCount, lineInGroup) {
    let bagHas = {};
    let split = line.split(' ');
    let sourceBag = split[0] + ' ' + split[1];
    let results = line.match(regex);
    if(results === null) return;
    for(let sub of results) {
        split = sub.split(' ');
        let numb = Number(split[0]);
        let destBag = split[1] + ' ' + split[2];
        bagHas[destBag] = numb;
    }
    bagMap[sourceBag] = bagHas;
};

let getContents = function(bagColor, qty) {
    let contents = {};
    let has = bagMap[bagColor];
    if(Object.keys(has).length > 0) {
        for(let key in has) {
            if(!contents.hasOwnProperty(key)) contents[key] = 0;
            contents[key] += qty * has[key];
            if(bagMap.hasOwnProperty(key)) {
                let subContents = getContents(key, has[key] * qty);
                for(let key of Object.keys(subContents)) {
                    if(!contents.hasOwnProperty(key)) contents[key] = 0;
                    contents[key] += subContents[key];
                }
            }
        }
        return contents;
    } else {
        return contents;
    }
};

utils.parseFile('./input.txt', function(line) {
    handleEachLine(line);
}, null, function() {
    let contents = getContents('shiny gold', 1);

    console.log(JSON.stringify(contents));
    let sum = 0;
    for(let key of Object.keys(contents)) {
        console.log()
        sum += contents[key];
    }
    return sum;
});

//321 is not right

