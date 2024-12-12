import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

export const queryClient = postgres(process.env.DATABASE_URL!, { 
  max: 3,
  idle_timeout: 20,
  connect_timeout: 10,
})
export const db = drizzle(queryClient, { schema })