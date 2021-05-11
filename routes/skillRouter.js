const express = require('express');
const router = express.Router();

const {
  getSkills,
  getUsersBySkill
} = require('../controllers/skillController');

// /skill
router.route('/').get(getSkills);

<<<<<<< HEAD
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

=======
// /skill/:id
router.route('/:id').get(getUsersBySkill);
>>>>>>> 7533f06f4e5459f60e49bed9e4e8af60c91189b2

module.exports = router;