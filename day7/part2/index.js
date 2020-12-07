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

utils.parseFile('./input.txt', handleEachLine, null, function() {
    let sum = 0;
    for(let val of Object.values(getContents('shiny gold', 1))) {
        sum += val;
    }
    return sum;
});

//answer is 1469

