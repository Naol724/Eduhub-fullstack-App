const express = require('express');
const router = express.Router();
const { Enrollment, Course, User } = require('../models');
const { protect } = require('../middleware/auth');

// Get user enrollments
router.get('/my-courses', protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: Course,
          as: 'course',
          include: [
            {
              model: User,
              as: 'instructor',
              attributes: ['id', 'first_name', 'last_name']
            }
          ]
        }
      ]
    });

    res.json({
      success: true,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Enroll in course
router.post('/', protect, async (req, res) => {
  try {
    const { courseId } = req.body;

    // Check if course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      where: { user_id: req.user.id, course_id: courseId }
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    const enrollment = await Enrollment.create({
      user_id: req.user.id,
      course_id: courseId,
      enrollment_date: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      data: enrollment
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;