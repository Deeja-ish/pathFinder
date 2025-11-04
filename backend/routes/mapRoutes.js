const express = require('express');
const router = express.Router();
const {
  saveMap,
  getMyMaps,
  getMapById,
  deleteMap,
} = require('../controllers/mapController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').post(saveMap);
router.route('/my-maps').get(getMyMaps);
router.route('/:id').get(getMapById).delete(deleteMap);

module.exports = router;