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
            for(let key of Object.keys(subContents)) {
                if(!contents.hasOwnProperty(key)) contents[key] = 0;
                contents[key] += subContents[key];
            }
        }
    }
    return contents;
};

let hasGold = 0;
utils.parseFile('./input.txt', handleEachLine, null, function() {
    // At this point, bag has has a list of each bag and the types of bag it contains, let's just brute force it
    for(let key in bagMap) {
        let contents = getContents(key, bagMap[key]);
        if(contents.hasOwnProperty('shiny gold'))
            hasGold++;
    }
    return hasGold;
});

// answer is 103
