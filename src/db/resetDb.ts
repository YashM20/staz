// import { db, client } from './index';
import * as schema from '@/db/schema';
import { sql } from 'drizzle-orm';
import { db, dbClient } from '@/db/config';

async function resetDatabase() {
  try {
    console.log('Starting database reset...');

    // Get all table names from the schema
    const tables = Object.values(schema).filter((table): table is any => 
      typeof table === 'object' && 
      table !== null && 
      '$type' in table &&
      table.$type === 'table' &&
      '_' in table
    );

    // Drop all tables in reverse order to handle foreign key constraints
    for (const table of tables.reverse()) {
      const tableName = table._.name;
      console.log(`Dropping table: ${tableName}`);
      // Use raw SQL to drop the table
      await db.execute(sql`DROP TABLE IF EXISTS "${sql.identifier(tableName)}" CASCADE`);
    }

    console.log('All tables cleared successfully');
    
    return { success: true, message: 'Database reset completed successfully' };
  } catch (error) {
    console.error('Error resetting database:', error);
    return { 
      success: false, 
      message: 'Failed to reset database', 
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    // Close the database connection
    await dbClient.end();
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  resetDatabase()
    .then((result) => {
      console.log(result.message);
      process.exit(result.success ? 0 : 1);
    })
    .catch((error) => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}

export default resetDatabase;
