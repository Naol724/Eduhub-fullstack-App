const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 200]
    }
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  short_description: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  instructor_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories',
      key: 'id'
    }
  },
  level: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    defaultValue: 'beginner'
  },
  language: {
    type: DataTypes.STRING,
    defaultValue: 'en'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'USD'
  },
  is_free: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  cover_image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  trailer_video: {
    type: DataTypes.STRING,
    allowNull: true
  },
  duration_hours: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  duration_minutes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'archived'),
    defaultValue: 'draft'
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  enrollment_limit: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  enrollment_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0.00
  },
  rating_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  requirements: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  learning_objectives: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  target_audience: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  syllabus: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  certificate_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  certificate_template: {
    type: DataTypes.STRING,
    allowNull: true
  },
  completion_criteria: {
    type: DataTypes.JSON,
    defaultValue: {
      min_lessons_completed: 100,
      min_quizzes_passed: 80,
      min_assignments_submitted: 100
    }
  },
  enrollment_start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  enrollment_end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  course_start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  course_end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  seo_title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  seo_description: {
    type: DataTypes.STRING(160),
    allowNull: true
  },
  seo_keywords: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  analytics: {
    type: DataTypes.JSON,
    defaultValue: {
      views: 0,
      enrollments: 0,
      completions: 0,
      avg_completion_time: 0
    }
  }
}, {
  tableName: 'courses',
  underscored: true,
  hooks: {
    beforeCreate: (course) => {
      if (!course.slug) {
        course.slug = course.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
    },
    beforeUpdate: (course) => {
      if (course.changed('title') && !course.changed('slug')) {
        course.slug = course.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
    }
  }
});

// Instance methods
Course.prototype.getTotalDuration = function() {
  return this.duration_hours * 60 + this.duration_minutes;
};

Course.prototype.getFormattedDuration = function() {
  const totalMinutes = this.getTotalDuration();
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours === 0) {
    return `${minutes}m`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }
};

Course.prototype.isEnrollmentOpen = function() {
  const now = new Date();
  
  if (this.enrollment_start_date && now < this.enrollment_start_date) {
    return false;
  }
  
  if (this.enrollment_end_date && now > this.enrollment_end_date) {
    return false;
  }
  
  if (this.enrollment_limit && this.enrollment_count >= this.enrollment_limit) {
    return false;
  }
  
  return this.status === 'published';
};

Course.prototype.updateRating = async function(newRating) {
  const totalRating = (this.rating * this.rating_count) + newRating;
  const newRatingCount = this.rating_count + 1;
  const newAverageRating = totalRating / newRatingCount;
  
  return this.update({
    rating: Math.round(newAverageRating * 100) / 100,
    rating_count: newRatingCount
  });
};

module.exports = Course;