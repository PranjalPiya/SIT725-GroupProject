const Agency = require('../model/agencyModel');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

// Create Agency
const createAgency = asyncHandler(async (req, res) => {
  const agency = new Agency(req.body);
  const createdAgency = await agency.save();
  res.status(201).json(createdAgency);
});

// Get All Agencies
const getAgencies = asyncHandler(async (req, res) => {
  const agencies = await Agency.find({});
  res.json(agencies);
});

// Get Agency by ID
const getAgencyById = asyncHandler(async (req, res) => {
  const agencyId = req.params.id.trim();

  // Validate if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(agencyId)) {
    res.status(400);
    throw new Error('Invalid Agency ID');
  }

  const agency = await Agency.findById(agencyId);
  if (agency) {
    res.json(agency);
  } else {
    res.status(404);
    throw new Error('Agency not found');
  }
});

// Update Agency
const updateAgency = asyncHandler(async (req, res) => {
  const agency = await Agency.findById(req.params.id);
  if (agency) {
    Object.assign(agency, req.body);
    const updatedAgency = await agency.save();
    res.json(updatedAgency);
  } else {
    res.status(404).json({ message: 'Agency not found' });
  }
});

// Delete Agency
const deleteAgency = asyncHandler(async (req, res) => {
  const agencyId = req.params.id.trim();

  // Validate if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(agencyId)) {
    res.status(400);
    throw new Error('Invalid Agency ID');
  }

  const agency = await Agency.findById(agencyId);

  if (agency) {
    // Using deleteOne instead of remove
    await agency.deleteOne();
    res.json({ message: 'Agency removed successfully' });
  } else {
    res.status(404).json({ message: 'Agency not found' });
  }
});

// Export all functions
module.exports = {
  createAgency,
  getAgencies,
  getAgencyById,
  updateAgency,
  deleteAgency,
};