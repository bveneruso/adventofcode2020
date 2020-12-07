const utils = require('../../utils/utils');

let map = {};
let width = 0;
let height = 0;

let getKey = function(x, y) {
    return x + ',' + y;
};

let getMapInfo = function(x, y) {
    return map[getKey(x % (width + 1), y)];
};

let countTreesInPath = function(xMod, yMod) {
    let [x, y, trees] = [0, 0, 0];
    while(y < height) {
        x += xMod;
        y += yMod;
        if (getMapInfo(x, y).hasTree)
            trees++;
    }
    return trees;
};

utils.parseFile('./input.txt', function(line, y) {
    utils.forEachChar(line, function(char, x) {
        let isTree = char == '#';
        width = Math.max(x, width);
        height = Math.max(y, height);
        map[getKey(x, y)] = {
            hasTree: isTree
        };
    });
}, null, function() {
    return countTreesInPath(1, 1) * countTreesInPath(3, 1) * countTreesInPath(5, 1) * countTreesInPath(7, 1) * countTreesInPath(1, 2);
});

// Answer is 3847183340
