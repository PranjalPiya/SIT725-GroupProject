const express = require('express');
require('dotenv').config();
require('./dbConnect');  // Ensures MongoDB connection
const app = express();
const path = require('path');

const userRoutes = require('./router/router'); // Import user routes
const trekRoutes = require('./router/trekRouter');
// const reviewRoutes = require('./router/reviewRouter');
const agencyRoutes = require('./router/agencyRoutes');

app.use(express.json()); // Middleware to parse JSON bodies

// Serve static files from the "view" directory (chat.html, chat.js, etc.)
app.use(express.static(path.join(__dirname, '../Frontend')));




// Use the user routes for any requests to /api/user/
app.use('/api/user', userRoutes);
app.use('/api/treks', trekRoutes);
app.use('/api/agencies', agencyRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!. Mongo is also added I guess');
});

// Start the server on specified port from .env or default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
