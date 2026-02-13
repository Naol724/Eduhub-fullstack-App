const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  });

  try {
    console.log('Connected to MySQL server');
    
    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = await fs.readFile(schemaPath, 'utf8');
    
    // Split the SQL file into individual statements
    const statements = schemaSQL
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0 && !statement.startsWith('--'));
    
    console.log(`Executing ${statements.length} SQL statements...`);
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          // Use query instead of execute for statements that don't support prepared statements
          if (statement.trim().toUpperCase().startsWith('USE ') || 
              statement.trim().toUpperCase().startsWith('CREATE DATABASE') ||
              statement.trim().toUpperCase().startsWith('DROP DATABASE')) {
            await connection.query(statement);
          } else {
            await connection.execute(statement);
          }
          console.log('✓ Executed:', statement.substring(0, 50) + '...');
        } catch (error) {
          if (error.code !== 'ER_TABLE_EXISTS_ERROR' && error.code !== 'ER_DB_EXISTS_ERROR') {
            console.error('Error executing statement:', statement);
            throw error;
          } else {
            console.log('⚠ Already exists:', statement.substring(0, 50) + '...');
          }
        }
      }
    }
    
    console.log('✅ Database initialization completed successfully!');
    
    // Verify tables were created
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📋 Tables created:', tables.map(t => Object.values(t)[0]));
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database setup completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database setup failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeDatabase };
