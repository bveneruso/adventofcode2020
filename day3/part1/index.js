const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);

let map = {};
let width = 0;
let height = 0;

let addMapInfo = function(x, y, isTree) {
    if(x > width) {
        width = x;
    }
    if(y > height) {
        height = y;
    }
    map[getKey(x, y)] = {
        hasTree: isTree
    };
};

let getKey = function(x, y) {
  return x + ',' + y;
};

let getMapInfo = function(x, y) {
    x = x % (width + 1);
    return map[getKey(x, y)];
};

let countTreesInPath = function(xMod, yMod) {
    let x = 0;
    let y = 0;
    let trees = 0;
    console.log("Starting tree count with max height of " + height);
    while(y < height) {
        x += xMod;
        y += yMod;
        if (getMapInfo(x, y).hasTree) {
            trees++;
        }
    }
    return trees;
};

let lineCount = 0;

eachLine('./input.txt', function(line) {
    for(let i = 0; i < line.trim().length; i++) {
        let char = line.trim().charAt(i);
        switch(char) {
            case '.': {
                addMapInfo(i, lineCount, false);
                break;
            }
            case '#': {
                addMapInfo(i, lineCount, true);
                break;
            }
        }
    }
    console.log("Finished parsing file line " + lineCount);
    lineCount++;
}).then(function(err) {
    console.log(countTreesInPath(1, 1) * countTreesInPath(3, 1) * countTreesInPath(5, 1) * countTreesInPath(7, 1) * countTreesInPath(1, 2))
});




