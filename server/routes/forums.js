const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Placeholder for forum routes
router.get('/', protect, async (req, res) => {
  res.json({
    success: true,
    message: 'Forum routes - Coming soon',
    data: []
  });
});

module.exports = router;