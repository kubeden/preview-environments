import postgres from "postgres";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  const schema = process.env.DATABASE_SCHEMA;
  if (!schema) {
    throw new Error("DATABASE_SCHEMA is required");
  }

  console.log(`Creating schema: ${schema}`);
  const client = postgres(connectionString, { max: 1 });

  await client`CREATE SCHEMA IF NOT EXISTS ${client(schema)}`;

  console.log(`Schema ${schema} created`);
  await client.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed to create schema:", err);
  process.exit(1);
});
