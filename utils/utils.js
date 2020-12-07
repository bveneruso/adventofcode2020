const lineReader = require('line-reader');
const Promise = require('bluebird');
const eachLine = Promise.promisify(lineReader.eachLine);

/**
 * Parses a file with common callbacks
 * @param inputFile             Name of input file
 * @param forEachLineCallback   callback(line, lineCount, lineInGroup)
 * @param groupEndCallback      callback(group) where group is an array of trimmed lines in the group
 * @param onFinishCallback      callback()
 */
function parseFile(inputFile, forEachLineCallback, groupEndCallback, onFinishCallback) {
    let group = [];
    let lineCount = 0;
    let lineInGroup = 0;
    eachLine(inputFile, function(line) {
        if(line.trim().length == 0) {
            if(groupEndCallback !== undefined && groupEndCallback !== null)
                groupEndCallback(group);
            lineInGroup = 0;
            group = [];
        } else {
            let keepGoing = true;
            group.push(line.trim());
            if(forEachLineCallback !== undefined && forEachLineCallback !== null)
                keepGoing = forEachLineCallback(line.trim(), lineCount, lineInGroup);
            if(keepGoing === false)
                return false;
            lineInGroup++;
            lineCount++;
        }
    }).then(function(err) {
        let result = '';
        if(groupEndCallback !== undefined && groupEndCallback !== null && group.length > 0)
            groupEndCallback(group);
        if(onFinishCallback !== undefined && onFinishCallback !== null)
            result = onFinishCallback();
        if(result !== undefined && result.toString().length > 0) {
            console.log('Result: ' + result);
        }
    });
}

/**
 * Runs a function for each character in a string
 * @param inputString
 * @param callback Function to call, calls it like callback(character, index)
 */
function forEachChar(inputString, callback) {
    for(let i = 0; i < inputString.length; i++) {
        callback(inputString.charAt(i), i);
    }
}

/**
 * Runs a function for each chunk of a string where a chunk is a substring of the input divided by the separator
 * @param inputString The input string to chunk and process
 * @param callback The callback function to call, calls it like callback(chunk, index)
 * @param chunkSeparator The string to split the input by, defaults to a space
 */
function forEachChunk(inputString, callback, chunkSeparator) {
    if(chunkSeparator === undefined) chunkSeparator = ' ';
    let split = inputString.split(chunkSeparator);
    for(let i = 0; i < split.length; i++) {
        callback(split[i].trim(), i);
    }
}

/**
 * Returns the character at the given index, or if not possible, the default
 * @param input
 * @param index The index to fetch the character at, starting at 0
 * @param def The default value to use, defaults to empty string
 */
function charAt(input, index, def) {
    if(def === undefined) def = '';
    return input.length > index && index >= 0 ? input.charAt(index): def;
}

module.exports = {
    forEachChar,
    parseFile,
    forEachChunk,
    charAt
};
