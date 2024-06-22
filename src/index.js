const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const apiRoutes = require('./routes/index');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = socketIo(server);

// Use API routes
app.use('/api', apiRoutes);

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.set('io', io); // Make io accessible in the routes

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
