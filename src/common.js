const fs = require('fs');
const path = require('path');

function readrandomline(location) {
    var info = fs.readFileSync(path.join(__dirname, path.join("/randomreply/",location)), 'utf8');
    var lines = info.toString().split(/[\r\n]+/);
    var rndline = Math.floor(Math.random() * lines.length+1)-1;
    var line = lines[rndline];
    info = line;
    return info;
};

function readtxtfile(location) {
    var text = fs.readFileSync(path.join(__dirname, path.join("/textfiles/",location)), 'utf8');
    return text;
}

function fuse(callback) {
    try {
        callback();
    } catch (error) {
        console.error(chalk.redBright(error));
    }
}

module.exports = { readrandomline, readtxtfile, fuse };