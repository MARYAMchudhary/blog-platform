
import { defineConfig } from "drizzle-kit";
import type { Config } from 'drizzle-kit'
export default defineConfig({
    schema: './src/drizzle/schema.ts',
    out: './drizzle/migrations',
    // driver: 'pg' as any,
    dialect: 'postgresql',
    dbCredentials: {
        // url: 'postgresql://postgres:875MW1YMmUqGZlIC@db.uvjrnfcgbchudvsrwbld.supabase.co:5432/postgres'
        url: 'SUPABASE_DB_URL'
        // url: process.env.SUPABASE_DB_URL!
    }
} satisfies Config)