import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

config({ path: '.env' });

// Disable prefetch as it is not supported for "Transaction" pool mode 
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export const dbClient = postgres(process.env.DATABASE_URL, {
  prepare: false,
  max: 3,
  idle_timeout: 20,
  connect_timeout: 10,
})

export const db = drizzle(dbClient, { schema: schema});