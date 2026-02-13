# Database Setup

This folder contains all database-related files for the EduHub application.

## Files

- `schema.sql` - Complete database schema with tables and initial data
- `init-database.js` - Script to initialize the database using raw SQL
- `seed-database.js` - Script to seed the database using Sequelize models
- `README.md` - This file

## Setup Instructions

### Option 1: Using Raw SQL (Recommended for initial setup)

1. Make sure MySQL is running on your system
2. Update your `.env` file with database credentials
3. Run the initialization script:

```bash
cd server
node database/init-database.js
```

### Option 2: Using Sequelize Models

1. Make sure MySQL is running and the database exists
2. Update your `.env` file with database credentials
3. Run the seeding script:

```bash
cd server
node database/seed-database.js
```

## Database Credentials

Default credentials for testing:

- **Admin**: admin@eduhub.com / admin123
- **Instructor**: instructor@eduhub.com / instructor123  
- **Student**: student@eduhub.com / student123

## Environment Variables

Make sure your `.env` file contains:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=eduhub
```

## Tables Created

1. `users` - User accounts and authentication
2. `categories` - Course categories
3. `courses` - Course information and content
4. `enrollments` - Student enrollments and progress

## Troubleshooting

If you encounter connection issues:

1. Verify MySQL is running
2. Check database credentials in `.env`
3. Ensure the database user has proper permissions
4. Make sure the database name matches in both `.env` and schema
