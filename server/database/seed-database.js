const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function seedDatabase() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Import models
    const User = require('../models/User');
    const Category = require('../models/Category');
    const Course = require('../models/Course');
    const Enrollment = require('../models/Enrollment');

    console.log('Syncing database models...');
    await sequelize.sync({ force: false });
    console.log('✅ Database models synced');

    // Seed categories
    console.log('Seeding categories...');
    const categories = await Category.bulkCreate([
      {
        name: 'Web Development',
        description: 'Learn modern web development technologies',
        slug: 'web-development',
        icon: 'code',
        color: '#3B82F6'
      },
      {
        name: 'Data Science',
        description: 'Master data analysis and machine learning',
        slug: 'data-science',
        icon: 'chart-bar',
        color: '#10B981'
      },
      {
        name: 'Mobile Development',
        description: 'Build mobile apps for iOS and Android',
        slug: 'mobile-development',
        icon: 'device-mobile',
        color: '#8B5CF6'
      },
      {
        name: 'Design',
        description: 'UI/UX design and graphic design courses',
        slug: 'design',
        icon: 'color-swatch',
        color: '#F59E0B'
      },
      {
        name: 'Business',
        description: 'Business skills and entrepreneurship',
        slug: 'business',
        icon: 'briefcase',
        color: '#EF4444'
      },
      {
        name: 'Marketing',
        description: 'Digital marketing and growth strategies',
        slug: 'marketing',
        icon: 'speakerphone',
        color: '#EC4899'
      }
    ]);
    console.log(`✅ Created ${categories.length} categories`);

    // Seed users
    console.log('Seeding users...');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const users = await User.bulkCreate([
      {
        id: uuidv4(),
        email: 'admin@eduhub.com',
        password: hashedPassword,
        first_name: 'Admin',
        last_name: 'User',
        role: 'admin',
        is_verified: true,
        is_active: true
      },
      {
        id: uuidv4(),
        email: 'instructor@eduhub.com',
        password: hashedPassword,
        first_name: 'John',
        last_name: 'Instructor',
        role: 'instructor',
        is_verified: true,
        is_active: true,
        bio: 'Experienced web developer with 10+ years in the industry'
      },
      {
        id: uuidv4(),
        email: 'student@eduhub.com',
        password: hashedPassword,
        first_name: 'Jane',
        last_name: 'Student',
        role: 'student',
        is_verified: true,
        is_active: true
      }
    ]);
    console.log(`✅ Created ${users.length} users`);

    console.log('🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Database seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedDatabase };
