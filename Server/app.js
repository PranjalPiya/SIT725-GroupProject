const express = require('express');
require('dotenv').config();
require('./dbConnect');  // Ensures MongoDB connection
const app = express();
const path = require('path');

const userRoutes = require('./router/router'); // Import user routes
const trekRoutes = require('./router/trekRouter');

app.use(express.json()); // Middleware to parse JSON bodies

// Serve static files from the "view" directory (chat.html, chat.js, etc.)
app.use(express.static(path.join(__dirname, '../Frontend')));




// Use the user routes for any requests to /api/user/
app.use('/api/user', userRoutes);
app.use('/api/treks', trekRoutes);



// Fallback to index.html for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend', 'index.html'));
});

// Start the server on specified port from .env or default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
