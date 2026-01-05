import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;
const dbSchema = process.env.DATABASE_SCHEMA || "public";

// Build connection string with search_path parameter
const urlWithSchema = connectionString.includes("?")
  ? `${connectionString}&options=-c%20search_path%3D${dbSchema}`
  : `${connectionString}?options=-c%20search_path%3D${dbSchema}`;

const client = postgres(urlWithSchema, {
  prepare: false,
});

export const db = drizzle(client, {
  schema,
  logger: process.env.NODE_ENV === "development",
});

export { dbSchema };
