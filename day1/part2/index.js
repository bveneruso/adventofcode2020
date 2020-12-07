const utils = require('../../utils/utils');
let set = new Set();


// Find three numbers that sum to 2020. Could be done by running original solution once for each number, changing the desired number.
//      ends up with O(n^2) which isn't ideal, but given the input size, this is fine.
utils.parseFile('./input.txt', function(line) {
    set.add(Number(line));
}, null, function() {
    for(let startNumb of set) {
        let desire = 2020 - startNumb;
        for(let numb of set) {
            let desiredNumb = desire - numb;
            if (set.has(desiredNumb)) {
                return (startNumb * numb * desiredNumb);
            }
        }
    }
});

//Answer is 199300880
