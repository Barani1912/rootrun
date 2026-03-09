const chalk = require('chalk');

const colors = [
    chalk.cyan,
    chalk.magenta,
    chalk.green,
    chalk.yellow,
    chalk.blue,
    chalk.red,
    chalk.white,
    chalk.gray
];

let colorIndex = 0;

function createLogger(folderName) {
    // Assign a color to this folder
    const colorFn = colors[colorIndex % colors.length];
    colorIndex++;

    const prefix = colorFn(`[${folderName}]`);

    let buffer = '';

    return function log(data) {
        const text = buffer + data.toString();
        const lines = text.split('\n');

        // The last element is either empty (if text ended with \n) 
        // or a partial line that doesn't have a newline yet
        buffer = lines.pop(); // keep partial line for next chunk

        for (const line of lines) {
            console.log(`${prefix} ${line}`);
        }
    };
}

module.exports = {
    createLogger
};
