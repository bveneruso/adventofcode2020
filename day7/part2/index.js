const utils = require('../../utils/utils');
const regex = new RegExp('\\d \\S* \\S*', 'g');

let bagMap = {}; // where each element points to a map of contained bag colors to numbers

let handleEachLine = function(line) {
    let bagHas = {};
    let [pattern, color] = line.split(' ');
    let results = line.match(regex);
    if(results === null) return;
    for(let sub of results) {
        let [numb, subPattern, subColor] = sub.split(' ');
        bagHas[`${subPattern} ${subColor}`] = Number(numb);
    }
    bagMap[`${pattern} ${color}`] = bagHas;
};

let getContents = function(bagColor, qty) {
    let contents = {};
    let has = bagMap[bagColor];

    for(let key in has) {
        if(!contents.hasOwnProperty(key)) contents[key] = 0;
        contents[key] += qty * has[key];
        if(bagMap.hasOwnProperty(key)) {
            let subContents = getContents(key, has[key] * qty);
            for(let key in subContents) {
                if(!contents.hasOwnProperty(key)) contents[key] = 0;
                contents[key] += subContents[key];
            }
        }
    }
    return contents;
};

utils.parseFile('./input.txt', handleEachLine, null, function() {
    let sum = 0;
    for(let val of Object.values(getContents('shiny gold', 1))) {
        sum += val;
    }
    return sum;
});

//answer is 1469

