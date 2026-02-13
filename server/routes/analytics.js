const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Placeholder for analytics routes
router.get('/', protect, async (req, res) => {
  res.json({
    success: true,
    message: 'Analytics routes - Coming soon',
    data: []
  });
});

module.exports = router;