const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');

// Contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, category, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields'
      });
    }

    // Log the contact form submission
    logger.info('Contact form submission:', {
      name,
      email,
      subject,
      category,
      timestamp: new Date().toISOString()
    });

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notification to admin
    // 3. Send confirmation email to user
    // 4. Integrate with support ticket system

    // For now, just simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
      data: {
        ticketId: `TICKET-${Date.now()}`,
        estimatedResponse: '24 hours'
      }
    });

  } catch (error) {
    logger.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: error.message
    });
  }
});

// Get contact information
router.get('/info', (req, res) => {
  res.json({
    success: true,
    data: {
      email: 'support@eduhub.com',
      phone: '+1 (555) 123-4567',
      address: '123 Education Street, Learning City, LC 12345',
      businessHours: {
        monday: '8:00 AM - 6:00 PM EST',
        tuesday: '8:00 AM - 6:00 PM EST',
        wednesday: '8:00 AM - 6:00 PM EST',
        thursday: '8:00 AM - 6:00 PM EST',
        friday: '8:00 AM - 6:00 PM EST',
        saturday: '10:00 AM - 4:00 PM EST',
        sunday: 'Closed'
      },
      socialMedia: {
        twitter: 'https://twitter.com/eduhub',
        facebook: 'https://facebook.com/eduhub',
        linkedin: 'https://linkedin.com/company/eduhub',
        instagram: 'https://instagram.com/eduhub'
      }
    }
  });
});

module.exports = router;