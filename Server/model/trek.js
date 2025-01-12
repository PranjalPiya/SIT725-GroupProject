// models/TrekDestination.js

const mongoose = require('mongoose');

const trekDestinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: [String], // Array of image URLs or filenames
        required: true
    },
    description: {
        type: String,
        required: true
    },
    totalDays: {
        type: Number,
        required: true
    },
    expenses: {
        type: Number, // Expected total expenses
        required: true
    },
    maxAltitude: {
        type: Number,
        required: true
    },
    difficultyLevel: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    bestSeason: {
        type: String,
        required: true
    },
    trekMap: {
        type: String, // URL or file path to the downloadable map
        required: true
    },
    totalDistance: {
        type: String,
        required: true
    }

});

const TrekDestination = mongoose.model('TrekDestination', trekDestinationSchema);
module.exports = TrekDestination;
