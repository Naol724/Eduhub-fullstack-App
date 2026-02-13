const sequelize = require('../config/database');

// Import existing models
const User = require('./User');
const Course = require('./Course');
const Category = require('./Category');
const Enrollment = require('./Enrollment');

// Define associations
const defineAssociations = () => {
  // User associations
  User.hasMany(Course, { foreignKey: 'instructor_id', as: 'instructedCourses' });
  User.hasMany(Enrollment, { foreignKey: 'user_id', as: 'enrollments' });

  // Course associations
  Course.belongsTo(User, { foreignKey: 'instructor_id', as: 'instructor' });
  Course.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
  Course.hasMany(Enrollment, { foreignKey: 'course_id', as: 'enrollments' });

  // Category associations
  Category.hasMany(Course, { foreignKey: 'category_id', as: 'courses' });

  // Enrollment associations
  Enrollment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
  Enrollment.belongsTo(Course, { foreignKey: 'course_id', as: 'course' });
};

// Initialize associations
defineAssociations();

module.exports = {
  sequelize,
  User,
  Course,
  Category,
  Enrollment
};