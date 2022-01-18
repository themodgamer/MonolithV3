const ngrok = require('ngrok');
const { ngrokauthtoken } = require('./maincfg.json');
const EventEmitter = require('events');

class Ngrokentity{
    constructor(){
        this.running = false;
        this.url = "None";
        this.status = 'closed';
        this.event = new EventEmitter();
    }

    async launch(){
        this.running = true;
        this.url = await ngrok.connect({
            proto: 'tcp', // http|tcp|tls, defaults to http
            addr: 25565, // port or network address, defaults to 80
            authtoken: ngrokauthtoken, // your authtoken from ngrok.com
            region: 'eu', // one of ngrok regions (us, eu, au, ap, sa, jp, in), defaults to us
            onStatusChange: status => {this.statuschange(status)}, // 'closed' - connection is lost, 'connected' - reconnected
        });
    }

    statuschange(status) {
        this.status = status;
        this.event.emit('statuschange', status);
    }
};

module.exports = Ngrokentity;
