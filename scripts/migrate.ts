// import {migrate} from "drizzle-orm/vercel-postgres/migrator"
// import {db} from "@/drizzle/db"


// async function main() {
//     await migrate(db, {migrationsFolder:"./drizzle"})
// }

// main()

// scripts/migrate.ts
//import { drizzle } from 'drizzle-orm';
import {migrate} from "drizzle-orm/vercel-postgres/migrator"
import {db} from "@/drizzle/db"
import { createClient } from '@vercel/postgres';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('Missing POSTGRES_URL environment variable');
}

// Create SQL client using Vercel Postgres library
const client = createClient({
  connectionString,
});

// Connect to the database
client.connect()
  .then(() => {
     migrate(db, {migrationsFolder:"../drizzle"})

    // Add your migration logic here
    // db.migrate() or any specific migration logic you have

    console.log('Migration completed successfully');
    client.end(); // Close the connection after the migration
  })
  .catch((error) => {
    console.error('Failed to connect to the database', error);
    client.end();
  });
