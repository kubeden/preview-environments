import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  const schema = process.env.DATABASE_SCHEMA || "public";
  console.log(`Running migrations for schema: ${schema}`);

  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client);

  // Create schema if it doesn't exist
  await client`CREATE SCHEMA IF NOT EXISTS ${client(schema)}`;

  // Set search path to the schema
  await client`SET search_path TO ${client(schema)}`;

  // Track migrations in the target schema so each preview has its own state
  await migrate(db, {
    migrationsFolder: "./drizzle",
    migrationsSchema: schema
  });

  console.log("Migrations complete");
  await client.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
