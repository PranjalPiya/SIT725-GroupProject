// const asyncHandler = require('express-async-handler');
// const mongoose = require('mongoose');
// const Review = require('../model/review_model');
// const { ObjectId } = mongoose.Types;

// // @desc    Create new review
// // @route   POST /api/:entityType/:entityId/reviews
// // @access  Private
// const createReview = asyncHandler(async (req, res) => {
//     const { rating, comment, photos } = req.body;

//     const { entityType, entityId } = req.params;

//     const validEntities = ['agencies', 'guides', 'treks']; // Define allowed entity types
//     if (!validEntities.includes(entityType)) {
//         res.status(400);
//         throw new Error(`Invalid entity type: ${entityType}`);
//     }

//     // Validate entityId format
//     if (!ObjectId.isValid(entityId)) {
//         res.status(400);
//         throw new Error(`Invalid entityId: ${entityId}`);
//     }

//     const review = new Review({
//         entityType,
//         entityId,
//         userId: req.user._id, // Extracted from req.user
//         rating,
//         comment,
//         photos
//     });

//     const createdReview = await review.save();

//     res.status(201).json(createdReview);
// });

// // @desc    Get reviews by entity type
// // @route   GET /api/:entityType/:entityId/reviews
// // @access  Public
// const getReviewsByEntityType = asyncHandler(async (req, res) => {
//     const { entityType, entityId } = req.params;

//     const validEntities = ['agencies', 'guides', 'treks']; // Define allowed entity types
//     if (!validEntities.includes(entityType)) {
//         res.status(400);
//         throw new Error(`Invalid entity type: ${entityType}`);
//     }

//     // Validate entityId format
//     if (!ObjectId.isValid(entityId)) {
//         res.status(400);
//         throw new Error(`Invalid entityId: ${entityId}`);
//     }

//     // Find reviews by the entity type only
//     const reviews = await Review.find({ entityType, entityId })
//         .populate('userId', 'name')  // Populate with user name
//         .sort('-createdAt');  // Sort by creation date in descending order

//     if (!reviews || reviews.length === 0) {
//         res.status(404);
//         throw new Error('Reviews not found');
//     }

//     res.json(reviews);  // Return the found reviews
// });

// // @desc    Update review
// // @route   PUT /api/:entityType/:entityId/reviews/:id
// // @access  Private
// const updateReview = asyncHandler(async (req, res) => {
//     const { entityType, entityId } = req.params;

//     const validEntities = ['agencies', 'guides', 'treks']; // Define allowed entity types
//     if (!validEntities.includes(entityType)) {
//         res.status(400);
//         throw new Error(`Invalid entity type: ${entityType}`);
//     }

//     // Validate entityId format
//     if (!ObjectId.isValid(entityId)) {
//         res.status(400);
//         throw new Error(`Invalid entityId: ${entityId}`);
//     }

//     const review = await Review.findOne({
//         _id: req.params.id,
//         entityType: entityType,
//         entityId: entityId,
//         userId: req.user._id
//     });

//     if (review) {
//         review.rating = req.body.rating || review.rating;
//         review.comment = req.body.comment || review.comment;
//         review.photos = req.body.photos || review.photos;

//         const updatedReview = await review.save();
//         await updateEntityRating(entityType, entityId);

//         res.json(updatedReview);
//     } else {
//         res.status(404);
//         throw new Error('Review not found');
//     }
// });

// // @desc    Delete review
// // @route   DELETE /api//:entityType/:entityId/reviews/:id
// // @access  Private
// const deleteReview = asyncHandler(async (req, res) => {
//     const { entityType, entityId } = req.params;

//     const validEntities = ['agencies', 'guides', 'treks']; // Define allowed entity types
//     if (!validEntities.includes(entityType)) {
//         res.status(400);
//         throw new Error(`Invalid entity type: ${entityType}`);
//     }

//     // Validate entityId format
//     if (!ObjectId.isValid(entityId)) {
//         res.status(400);
//         throw new Error(`Invalid entityId: ${entityId}`);
//     }

//     const review = await Review.findOne({
//         _id: req.params.id,
//         entityType: entityType,
//         entityId: entityId,
//         userId: req.user._id
//     });

//     if (review) {
//         await Review.deleteOne({ _id: review._id });
//         await updateEntityRating(entityType, entityId);
//         res.json({ message: 'Review removed' });
//     } else {
//         res.status(404);
//         throw new Error('Reviews not found');
//     }
// });
// // Helper function to get entity rating
// const getEntityRating = async (entityType, entityId) => {
//     try {
//         const reviews = await Review.find({ entityType, entityId });

//         // Calculate the total and average rating
//         const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//         const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

//         // Return the calculated average rating and review count
//         return {
//             averageRating,
//             reviewCount: reviews.length,
//         };
//     } catch (error) {
//         console.error('Error getting entity rating:', error);
//         throw new Error('Error getting entity rating');
//     }
// };


// // Helper function to update entity rating
// const updateEntityRating = async (entityType, entityId) => {
//     try {
//         const reviews = await Review.find({ entityType, entityId });
//         const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
//         const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

//         if (entityType === 'agencies') {
//             ModelName = 'Agency'
//         }

//         if (entityType === 'treks') {
//             ModelName = 'TrekDestination'
//         }

//         if (entityType === 'guides') {
//             ModelName = 'Guides'
//         }

//         const Model = mongoose.model(ModelName); // Dynamically get the model

//         await Model.findByIdAndUpdate(entityId, {
//             rating: averageRating,
//             reviewCount: reviews.length,
//         });
//     } catch (error) {
//         console.error('Error updating entity rating:', error);
//     }
// };


// // Export all functions
// module.exports = {
//     createReview,
//     getReviewsByEntityType,
//     updateReview,
//     deleteReview,
// };