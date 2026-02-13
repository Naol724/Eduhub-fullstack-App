const mysql = require('mysql2/promise');
require('dotenv').config();

async function testDatabaseConnection() {
  console.log('Testing database connection...');
  
  try {
    // Test connection to MySQL server
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });
    
    console.log('✅ Connected to MySQL server');
    
    // Test database exists
    const [databases] = await connection.execute('SHOW DATABASES');
    const dbExists = databases.some(db => db.Database === (process.env.DB_NAME || 'eduhub'));
    
    if (dbExists) {
      console.log('✅ Database exists:', process.env.DB_NAME || 'eduhub');
      
      // Test tables exist
      await connection.execute(`USE ${process.env.DB_NAME || 'eduhub'}`);
      const [tables] = await connection.execute('SHOW TABLES');
      console.log('✅ Tables found:', tables.map(t => Object.values(t)[0]));
      
    } else {
      console.log('❌ Database does not exist. Run: npm run db:init');
    }
    
    await connection.end();
    console.log('✅ Connection test completed');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Ensure MySQL is running');
    console.log('2. Check DB_HOST, DB_USER, DB_PASSWORD in .env');
    console.log('3. Verify database user has proper permissions');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  testDatabaseConnection();
}

module.exports = { testDatabaseConnection };
