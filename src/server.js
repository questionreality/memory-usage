const server = require('http').createServer();
const os = require('os-utils');

const io = require('socket.io')(server);


io.on('connection', client => {
  setInterval(() => {
    client.emit('free mem',{name:Math.floor(Date.now()/1000)%100,value:os.freememPercentage()*100, valueInMB: os.freemem(), pieValue :100-(os.freememPercentage()*100)})
  }, 1000);
});

server.listen(3000);
