const express = require('express');
require('dotenv').config();
require('./dbConnect');  // Ensures MongoDB connection
const app = express();

const userRoutes = require('./router/router'); // Import user routes
const trekRoutes = require('./router/trekRouter');

app.use(express.json()); // Middleware to parse JSON bodies

// Use the user routes for any requests to /api/user/
app.use('/api/user', userRoutes);
app.use('/api/treks', trekRoutes);
app.get('/', (req, res) => {
    res.send('Hello, World!. Mongo is also added I guess');
});

// Start the server on specified port from .env or default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
