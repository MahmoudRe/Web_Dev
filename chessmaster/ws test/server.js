let http = require('http');
let express = require('express');
let socketio = require('socket.io');

let port = process.argv[2];
let app = express();
let server = http.createServer(app);
let io = socketio(server);

io.on ('connection', function(socket) {
    socket.emit('msg', 'Hello!');
});

app.use(express.static(__dirname + '/client'));

server.listen(port, () => console.log('Readt to work!'));