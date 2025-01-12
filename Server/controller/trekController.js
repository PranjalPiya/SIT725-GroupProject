// controller/trekController.js

const TrekDestination = require('../model/trek');

// Create Trek Destination
const createTrekDestination = async (req, res) => {
    const { name,
        images,
        description,
        totalDays,
        expenses,
        difficultyLevel,
        maxAltitude,
        bestSeason,
        trekMap,
        totalDistance
    } = req.body;
    try {
        if (
            !name ||
            !images ||
            !description ||
            !totalDays ||
            !expenses ||
            !difficultyLevel ||
            !maxAltitude ||
            !bestSeason ||
            !trekMap ||
            !totalDistance
        ) {
            console.error('Missing trek fields');
            return res.status(400).json({ statusCode: 400, message: 'Missing required fields' });

        }
        const newTrek = new TrekDestination({

            name,
            images,
            description,
            totalDays,
            expenses,
            difficultyLevel,
            maxAltitude,
            bestSeason,
            trekMap,
            totalDistance
        });

        await newTrek.save();
        res.status(201).json({ message: 'Trek destination created successfully', trek: newTrek });
    } catch (error) {
        res.status(500).json({ message: 'Error creating trek destination', error: error.message });
    }
};
// Get All Trek Destinations
const getAllTrekDestinations = async (req, res) => {
    try {
        const treks = await TrekDestination.find();
        res.status(200).json(treks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trek destinations', error: error.message });
    }
};

// Get Single Trek Destination by ID
const getTrekDestinationById = async (req, res) => {
    try {
        const trek = await TrekDestination.findById(req.params.id);
        if (!trek) {
            return res.status(404).json({ message: 'Trek destination not found' });
        }
        res.status(200).json(trek);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching trek destination', error: error.message });
    }
};

// // Add Rating/Review
// const addReview = async (req, res) => {
//     try {
//         const { rating, review } = req.body;
//         const trek = await TrekDestination.findById(req.params.id);
//         if (!trek) {
//             return res.status(404).json({ message: 'Trek destination not found' });
//         }

//         trek.reviews.push({
//             user: req.user._id, // Assuming user ID is stored in req.user after authentication
//             rating,
//             review
//         });

//         await trek.save();
//         res.status(201).json({ message: 'Review added successfully', trek });
//     } catch (error) {
//         res.status(500).json({ message: 'Error adding review', error: error.message });
//     }
// };


module.exports = { createTrekDestination, getAllTrekDestinations, getTrekDestinationById };
