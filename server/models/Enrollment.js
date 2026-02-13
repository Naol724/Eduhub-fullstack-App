const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  course_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  enrollment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  completion_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'dropped', 'suspended'),
    defaultValue: 'active'
  },
  progress_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00
  },
  last_accessed: {
    type: DataTypes.DATE,
    allowNull: true
  },
  time_spent_minutes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  grade: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  certificate_issued: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  certificate_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'enrollments',
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'course_id']
    }
  ]
});

// Instance methods
Enrollment.prototype.updateProgress = async function(progressPercentage) {
  const updates = {
    progress_percentage: progressPercentage,
    last_accessed: new Date()
  };
  
  if (progressPercentage >= 100 && this.status === 'active') {
    updates.status = 'completed';
    updates.completion_date = new Date();
  }
  
  return this.update(updates);
};

Enrollment.prototype.addTimeSpent = async function(minutes) {
  return this.update({
    time_spent_minutes: this.time_spent_minutes + minutes,
    last_accessed: new Date()
  });
};

module.exports = Enrollment;