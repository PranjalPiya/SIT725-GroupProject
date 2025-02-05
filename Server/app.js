const express = require('express');
require('dotenv').config();
require('./dbConnect');  // Ensures MongoDB connection
const path = require('path');
const cookieParser = require('cookie-parser');
 
const app = express();
 
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
const bookingRoutes = require('./router/bookingRoutes');  

const bcrypt = require('bcrypt');

// Example usage:
bcrypt.hash('myPlaintextPassword', 10, function(err, hash) {
  console.log(hash);
});// Booking routes
 
// Mount routes with base paths
app.use('/api/user', userRoutes);
app.use('/api/treks', trekRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/bookings', bookingRoutes);
 
// Fallback to index.html for any other requests (good for SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'index.html'));
});
 
// Centralized error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error('Internal server error:', err);
    res.status(500).json({ message: 'Internal server error' });
});
 
// Start the server on specified port from .env or default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));