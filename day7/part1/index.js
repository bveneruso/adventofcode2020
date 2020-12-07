const utils = require('../../utils/utils');
const regex = new RegExp('\\d \\S* \\S*', 'g');

let bagMap = {}; // where each element points to a map of contained bag colors to numbers
let bagContents = {}; // where each bag has a map of all bags contained within it

let handleEachLine = function(line) {
    let bagHas = {};
    let [pattern, color] = line.split(' ');
    let results = line.match(regex);
    if(results === null) return;
    for(let innerBag of results) {
        let [innerBagCount, subPattern, subColor] = innerBag.split(' ');
        bagHas[`${subPattern} ${subColor}`] = Number(innerBagCount);
    }
    bagMap[`${pattern} ${color}`] = bagHas;
};

let getContents = function(bagColor, qty) {

    if(!bagContents.hasOwnProperty(bagColor)) {
        let contents = {};
        let has = bagMap[bagColor];
        for(let innerBagColor in has) {
            if(!contents.hasOwnProperty(innerBagColor)) contents[innerBagColor] = 0;
            contents[innerBagColor] += has[innerBagColor];
            if(bagMap.hasOwnProperty(innerBagColor)) {
                let subContents = getContents(innerBagColor, has[innerBagColor]);
                for(let nestedInnerBag in subContents) {
                    if(!contents.hasOwnProperty(nestedInnerBag)) contents[nestedInnerBag] = 0;
                    contents[nestedInnerBag] += subContents[nestedInnerBag];
                }
            }
            bagContents[bagColor] = contents;
        }
    }

    let myContents = {};
    Object.assign(myContents, bagContents[bagColor]);
    for(let key of Object.keys(myContents)) {
        myContents[key] *= qty;
    }

    return myContents;
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
