const http = require('http');
const SocketIO = require('socket.io');

const server = http.createServer();
const io = SocketIO(server);

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("New user:", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        io.emit('receive', { message: message, name: users[socket.id] });
    });
});

const PORT = process.env.PORT || 8000; // Use process.env.PORT if available
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
