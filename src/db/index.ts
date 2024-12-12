// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres';
// import * as schema from './schema';

// // Types for configuration
// interface DatabaseConfig {
//   connectionString: string;
//   max?: number;
//   idle_timeout?: number;
//   connect_timeout?: number;
// }

// // Default configuration
// const defaultConfig: DatabaseConfig = {
//   connectionString: process.env.DATABASE_URL!,
//   max: 10,
//   idle_timeout: 20,
//   connect_timeout: 10,
// };

// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL is not set');
// }

// // Create postgres client with configuration
// export const client = postgres(process.env.DATABASE_URL, {
//   max: defaultConfig.max,
//   idle_timeout: defaultConfig.idle_timeout,
//   connect_timeout: defaultConfig.connect_timeout,
// });

// // Initialize drizzle with the client and schema
//  const db = drizzle(client, { schema });
// export default db;
// // Export schema
// // export { schema };

// // // Export types
// // export type DbClient = typeof client;
// // export type DB = typeof db;
