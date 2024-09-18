const express = require('express');
const path = require('path');
const http = require('http');
const expressLayouts = require('express-ejs-layouts');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const chatRouter = require('./routes/chatRouter').router;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/chat', chatRouter);

// Evento de conexão com o cliente
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  // Evento de mensagem recebida do cliente
  socket.on('chat message', (msg) => {
    console.log('Mensagem recebida:', msg);
    // Envia a mensagem para todos os clientes conectados
    io.emit('chat message', msg);
  });

  // Evento de desconexão do cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Define a porta e inicia o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
