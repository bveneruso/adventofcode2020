const utils = require('../../utils/utils');

let program = []; // array of commands, where each element is an object
let accum = 0;
let currentIndex = 0;

let handleEachLine = function(line) {
    let [cmd, arg] = line.split(' ');
    program.push({
        cmd: cmd,
        arg: arg
    });
};

let runProgram = function() {

    // Reset program state
    accum = 0;
    currentIndex = 0;
    for(let [, val] of Object.entries(program)) {
        val.times = 0;
    }

    while(currentIndex < program.length) {
        let instruction = program[currentIndex];
        instruction.times++;
        if(instruction.times === 2) {
            return accum;
        }
        switch(instruction.cmd) {
            case 'nop': {
                currentIndex++;
                break;
            }
            case 'acc': {
                accum += Number(instruction.arg.replace('+', ''));
                currentIndex++;
                break;
            }
            case 'jmp': {
                currentIndex += Number(instruction.arg.replace('+', ''));
                break;
            }
        }

    }
};

utils.parseFile('./input.txt', handleEachLine, null, function() {
    runProgram();
    return accum;
});

// answer is 1614
