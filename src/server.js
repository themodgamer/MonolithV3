const { spawn } = require('child_process');
const EventEmitter = require('events');

class Server{
    constructor(batlocation){
        this.batlocation = batlocation;
        this.status = 'offline';
        this.running = false;
        this.bat = null;
        this.event = new EventEmitter();
    }

     launch(){
        this.running = true;
        this.bat = spawn('cmd.exe', ['/c', this.batlocation]);

        this.bat.stdout.on('data', (data) => {
            if (data.includes("]: Done (")) {
                this.event.emit('Done');
                this.status = 'Online';
            }
            console.log(data.toString());
        });
        
        this.bat.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        this.bat.on('exit', (code) => {
            console.log(`Server exited with code ${code}`);
            this.running = false;
            this.event.emit('Exit');
            this.status = 'Offline';
        });
    }

    close(){
        if (this.running == true) {
            this.bat.stdin.write("stop" + '\n');
            this.running = false;
        }
    }

    cmd(command){
        if (this.running == true) {
            this.bat.stdin.write(command + '\n');
        }
    }
};

module.exports = Server;