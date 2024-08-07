
import * as schema from './schema';
import config from "./envConfig";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users, NewUser } from './schema';

let sslmode = "";
if (config.APP_ENV === "prod") {
  sslmode = "?sslmode=require";
}

export const pool = new Pool({
  connectionString: config.POSTGRES_URL + sslmode,
});
export const db = drizzle(pool, {
  schema,
  logger: true, // Enable logging
});
export const insertUser = async (user: NewUser) => {
  return db.insert(users).values(user).returning();
};