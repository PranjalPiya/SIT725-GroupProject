const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  entityType: { 
    type: String, 
    required: true, 
    enum: ['guides', 'agencies', 'treks'] 
  },
  entityId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    refPath: 'entityType' 
  },
  userId: { 
    type: String, // Change to String to accept custom string IDs like 'user123'
    required: true,
    ref: 'User',
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String, 
    required: true 
  },
  photos: [{ 
    type: String 
  }]
}, { 
  timestamps: true 
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;