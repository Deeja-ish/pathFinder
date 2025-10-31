const express = require("express")
const router = express.Router();
const { generateMindMap } = require("../controllers/aiControllers");
const { protect } = require('../middleware/authMiddleware')

router.post('/generate-map', protect, generateMindMap)

module.exports = router