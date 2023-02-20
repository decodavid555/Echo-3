const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} connected`);

  socket.on('message', (text) => {
    io.emit('message', { id: Date.now(), user: socket.id, text });
  });

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
