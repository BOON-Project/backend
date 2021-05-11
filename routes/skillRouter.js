const express = require('express');
const router = express.Router();

const {
  getSkills,
} = require('../controllers/skillController');

// /skill
router.route('/').get(getSkills);

// /skill/id
// router.route('/').get(function(req, res) {
//   kennel.find({skill: {$in: ['coding']}},
//     function(err, result) {
//       if(err) {
//         res.send(err);
//       }else {
//         res.send(result);
//       }
//     })
// })


module.exports = router;