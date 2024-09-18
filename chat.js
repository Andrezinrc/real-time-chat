const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Envia mensagem para o servidor
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
 });

// Recebe mensagens do servidor
socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
});