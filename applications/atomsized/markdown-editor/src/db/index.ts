import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;
const dbSchema = process.env.DATABASE_SCHEMA || "public";

const client = postgres(connectionString, {
  prepare: false,
});

export const db = drizzle(client, {
  schema,
  logger: process.env.NODE_ENV === "development",
});

export { dbSchema };
