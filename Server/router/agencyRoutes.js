const express = require('express');

const { createAgency, 
  getAgencies, 
  getAgencyById, 
  updateAgency, 
  deleteAgency 
} = require('../controller/agencyController');

const router = express.Router();

router.route('/')
.get(getAgencies).post(createAgency);

router.route('/:id')
.get(getAgencyById).put(updateAgency).delete(deleteAgency);

module.exports = router;