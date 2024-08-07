import '@/drizzle/envConfig';
// import { defineConfig } from 'drizzle-kit';

// export default defineConfig({
//   schema: './drizzle/schema.ts',
//   out:"./drizzle",
//   driver: 'pg',
//   dbCredentials: {
//     connectionString: process.env.POSTGRES_URL!,
//   }
// });

import config from "@/drizzle/envConfig";
import { defineConfig } from "drizzle-kit";

let sslmode = "";
if (config.APP_ENV === "prod") {
  sslmode = "?sslmode=require";
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url:config.POSTGRES_URL + sslmode,
  },
  verbose: true,
  strict: true,
});