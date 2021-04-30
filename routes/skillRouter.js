const express = require('express');
const router = express.Router();

const {
  getSkills,
} = require('../controllers/skillController');

// /skill
router.route('/').get(getSkills);

module.exports = router;