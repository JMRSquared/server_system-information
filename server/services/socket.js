const si = require('systeminformation');

class Socket {
    constructor(io) {
        this.sockets = [];
        this.timers = [];
        io.on("connection", (socket) => {
            this.sockets.push(socket);
            console.log('sockets', this.sockets.length);
            socket.on('disconnect', () => {
                this.sockets = this.sockets.filter(v => v.id != socket.id);
                if (this.timers.some(t => t.id == 'timer_' + socket.id)) {
                    clearInterval(this.timers.find(t => t.id == 'timer_' + socket.id).timer)
                }
            });
            this.io = io;
            socket.on("getStats", () => this.getStats(socket));
        });
    }

    getStats(socket) {
        var timer = setInterval(() => {
            var timeData = si.time();
            socket.emit("sendStats", "TIME", timeData);
            si.system((data) => {
                socket.emit("sendStats", "SYSTEMINFO", data);
            });
            si.osInfo((data) => {
                socket.emit("sendStats", "OSINFO", data);
            });
            si.cpu((data) => {
                socket.emit("sendStats", "CPUINFO", data);
            });
            si.bios((data) => {
                socket.emit("sendStats", "BIOS", data);
            });
            si.baseboard((data) => {
                socket.emit("sendStats", "BASEBOARD", data);
            });
            si.services('*', (data) => {
                socket.emit("sendStats", "SERVICES", data);
            })
            si.currentLoad((data) => {
                socket.emit("sendStats", "CPUUSAGE", data);
            })
            si.processes((data) => {
                socket.emit("sendStats", "PROCESSUSAGE", data);
            })
            si.mem((data) => {
                socket.emit("sendStats", "MEM", data);
            })
        }, 1000);
        this.timers.push({
            timer: timer,
            id: 'timer_' + socket.id
        });
    }
}

module.exports = Socket;