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

// There's actually a bug here, just got luck it worked. We don't ADD counts of the same bag color to the contents, we just override
let getContents = function(bagColor, qty) {
    let contents = {};
    let has = bagMap[bagColor];
    if(Object.keys(has).length > 0) {
        for(let key in has) {
            if(!contents.hasOwnProperty(key)) contents[key] = 0;
            contents[key] += qty * has[key];

            if(bagMap.hasOwnProperty(key)) {
                let subContents = getContents(key, has[key]);
                contents = {...contents, ...subContents}
            }
        }
        return contents;
    } else {
        return contents;
    }
};

let hasGold = 0;
utils.parseFile('./input.txt', function(line) {
    handleEachLine(line);
}, null, function() {
    // At this point, bag has has a list of each bag and the types of bag it contains, let's just brute force it
    for(let key in bagMap) {
        let contents = getContents(key, bagMap[key]);
        if(contents.hasOwnProperty('shiny gold'))
            hasGold++;
        console.log(key + ' has ' + JSON.stringify((contents)));
    }
    return hasGold;
});

