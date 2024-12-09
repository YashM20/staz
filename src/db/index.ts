import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema';

// Types for configuration
interface DatabaseConfig {
  connectionString: string;
  max?: number; // max connections
  idle_timeout?: number; // idle connection timeout in seconds
  connect_timeout?: number; // connection timeout in seconds
}

// Default configuration
const defaultConfig: DatabaseConfig = {
  connectionString: process.env.DATABASE_URL!,
  max: 10, // maximum pool size
  idle_timeout: 20, // idle timeout in seconds
  connect_timeout: 10, // connection timeout in seconds
};

class Database {
  private static instance: Database;
  private _client: postgres.Sql;
  private _db: ReturnType<typeof drizzle>;

  private constructor(config: DatabaseConfig) {
    // Create postgres client with configuration
    this._client = postgres({
      ...config,
      max: config.max,
      idle_timeout: config.idle_timeout,
      connect_timeout: config.connect_timeout,
      onnotice: () => {}, // Silence notice messages
      onparameter: () => {}, // Silence parameter messages
    });

    // Initialize drizzle with the client and schema
    this._db = drizzle(this._client, { schema });
  }

  // Singleton pattern to ensure single database instance
  public static getInstance(config: DatabaseConfig = defaultConfig): Database {
    if (!Database.instance) {
      if (!config.connectionString) {
        console.log(config.connectionString);
        throw new Error('DATABASE_URL is not set in environment variables');
      }
      Database.instance = new Database(config);
    }
    return Database.instance;
  }

  // Get the database instance
  public get db() {
    return this._db;
  }

  // Get the postgres client
  public get client() {
    return this._client;
  }

  // Health check method
  public async healthCheck(): Promise<boolean> {
    try {
      await this._client`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  // Run migrations
  public async runMigrations(): Promise<void> {
    try {
      await migrate(this._db, {
        migrationsFolder: './drizzle',
      });
      console.log('Migrations completed successfully');
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  }

  // Graceful shutdown
  public async disconnect(): Promise<void> {
    try {
      await this._client.end();
      console.log('Database connection closed successfully');
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }
}

// Create and export the database instance
export const { db, client } = Database.getInstance();

// Export the schema
export { schema };

// Export types
export type DbClient = typeof client;
export type DB = typeof db;

// Handle graceful shutdown
process.on('SIGINT', async () => {
  try {
    await Database.getInstance().disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
});

// Initialize function for checking connection and running migrations
export async function initializeDatabase(): Promise<void> {
  const database = Database.getInstance();
  
  try {
    // Check database connection
    const isHealthy = await database.healthCheck();
    if (!isHealthy) {
      throw new Error('Database health check failed');
    }
    console.log('Database connection established successfully');

    // Run migrations if needed
    await database.runMigrations();
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Only run initialization if this is the main module
if (require.main === module) {
  initializeDatabase().catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });
}
