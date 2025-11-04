const express = require('express');
const router = express.Router();

const {
  initializeTransaction,
  verifyTransaction,
} = require('../controllers/paymentController'); 
const { protect } = require('../middleware/authMiddleware'); 

// All payment routes are protected
router.use(protect);

router.post('/initialize', initializeTransaction);
router.get('/verify', verifyTransaction);


module.exports = router;