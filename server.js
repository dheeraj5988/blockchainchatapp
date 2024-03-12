// Import necessary modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Import the 'path' module

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Define paths for static files
const publicDirectoryPath = path.join(__dirname, 'public');

// Serve static files from the 'public' directory
app.use(express.static(publicDirectoryPath));

// WebSocket connection event handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle chat message event
    socket.on('chat message', (message) => {
        console.log('Message received:', message);
        io.emit('chat message', message); // Broadcast the message to all connected clients
    });

    // Handle disconnection event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Define routes
app.get('/', (req, res) => {
    // Serve the index.html file when accessing the root URL ("/")
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/chat', (req, res) => {
    // Serve the chat.html file when accessing the '/chat' route
    res.sendFile(path.join(__dirname, 'public', 'chat.html'));
});

// Define server port and start listening
const PORT = process.env.PORT || 5500;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
