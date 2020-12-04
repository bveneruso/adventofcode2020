const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);

let inputMap = {};

// Find three numbers that sum to 2020. Could be done by running original solution once for each number, changing the desired number.
//      ends up with O(n^2) which isn't ideal, but given the input size, this is fine.
eachLine('./input.txt', function(line) {
    let numb = Number(line)
    inputMap[numb] = 1;
}).then(function(err) {
    Object.keys(inputMap).forEach((startNumb) => {
        let desiredNumb = 2020 - startNumb;
        if(desiredNumb > 0) {
            let product = findProductOfNumbersThatAddTo(startNumb, desiredNumb);
            if (product != Number.NEGATIVE_INFINITY) {
                console.log("Found product!");
                console.log(startNumb * product);
                process.exit();
            }
        }
    });
});

// TIL that it's hard to return straight out of a Array.forEach(..., use newer for of loop
let findProductOfNumbersThatAddTo = function(firstNumb, mustAddTo) {
    for(let numb of Object.keys(inputMap)) {
        let desiredNumb = mustAddTo - numb;
        if(desiredNumb > 0) {
            if (inputMap.hasOwnProperty(desiredNumb)) {
                return (numb * desiredNumb);
            }
        }
    }
    return Number.NEGATIVE_INFINITY;
};




