const express = require('express');
const http = require('http');
require('dotenv').config();
require('./dbConnect');  // Ensures MongoDB connection
const path = require('path');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);  // Create HTTP server
const io = new Server(server);          // Attach Socket.io to the HTTP server

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'Frontend')));

// Import and Mount Routes
const userRoutes = require('./router/router');
const trekRoutes = require('./router/trekRouter');
const agencyRoutes = require('./router/agencyRoutes');
const bookingRoutes = require('./router/bookingRoutes');
const paymentRoutes = require('./router/payementRoutes');

app.use('/api/user', userRoutes);
app.use('/api/treks', trekRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payement', paymentRoutes);

// Fallback for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

// Centralized Error Handling
app.use((err, req, res, next) => {
    console.error('Internal server error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

// Socket.IO Connection Event
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('chat message', (msg) => {
        console.log(`Message from ${socket.id}:`, msg);
        io.emit('chat message', msg);  // Broadcast message to all clients
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Only start the server if this file is run directly (Not in test mode)
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

// Export app and server for testing
module.exports = { app, server };
