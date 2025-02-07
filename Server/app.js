
const express = require('express');
const http = require('http');
require('dotenv').config();
require('./dbConnect');  // Ensures MongoDB connection
const path = require('path');
const cookieParser = require('cookie-parser');
// const socketIo = require('socket.io');
const { Server } = require('socket.io');


const app = express();

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = new Server(server);
// Middleware to parse JSON bodies and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files from the "Frontend" directory (now inside the server folder)
app.use(express.static(path.join(__dirname, 'Frontend')));

// Importing route files
const userRoutes = require('./router/router');         // User routes
const trekRoutes = require('./router/trekRouter');         // Trek related routes
const agencyRoutes = require('./router/agencyRoutes');     // Agency related routes
const bookingRoutes = require('./router/bookingRoutes');   // Booking routes
const paymentRoutes = require('./router/payementRoutes'); // Payment routes
const guidesRouter = require('./router/guideRoutes');

// Mount routes with base paths
app.use('/api/user', userRoutes);
app.use('/api/treks', trekRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payement', paymentRoutes);
app.use('/api/guides', guidesRouter);

// Fallback to index.html for any other requests (good for SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});

// Centralized error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error('Internal server error:', err);
    res.status(500).json({ message: 'Internal server error' });
});



// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('chat message', (msg) => {
        console.log(`Message from ${socket.id}:`, msg);
        // Broadcast message to all connected clients
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});


// Start the server on specified port from .env or default 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));

