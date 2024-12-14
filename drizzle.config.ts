import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    database: "postgres",
    port: 5432,
    host: "aws-0-ap-south-1.pooler.supabase.com",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  verbose: true,
  strict: true,
});
