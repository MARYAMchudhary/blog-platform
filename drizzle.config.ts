
import { defineConfig } from "drizzle-kit";
import type { Config } from 'drizzle-kit'
export default defineConfig({
    schema: './src/drizzle/schema.ts',
    out: './drizzle/migrations',
    // driver: 'pg' as any,
    dialect: 'postgresql',
    dbCredentials: {
        // url: 'postgresql://postgres:875MW1YMmUqGZlIC@db.uvjrnfcgbchudvsrwbld.supabase.co:5432/postgres'
        url: 'postgresql://postgres.uvjrnfcgbchudvsrwbld:875MW1YMmUqGZlIC@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres'
        // url: process.env.SUPABASE_DB_URL!
    }
} satisfies Config)