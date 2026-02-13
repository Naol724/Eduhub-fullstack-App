const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Placeholder for content routes
router.get('/', protect, async (req, res) => {
  res.json({
    success: true,
    message: 'Content routes - Coming soon',
    data: []
  });
});

module.exports = router;