const express = require('express');
const router = express.Router();

const {
  getSkills,
  getUsersBySkill
} = require('../controllers/skillController');

// /skill
router.route('/').get(getSkills);

// /skill/:id
router.route('/:id').get(getUsersBySkill);

module.exports = router;