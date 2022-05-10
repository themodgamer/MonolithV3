const EventEmitter = require('events');
var event = new EventEmitter();

process.stdin.on('data', data => {
    arr = String(data).replace("\r\n","").split(" ");
    event.emit(arr[0], String(data).replace(arr[0],"").trim());
});

module.exports = {event}