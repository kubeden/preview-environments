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

  if (schema === "public") {
    throw new Error("Cannot drop public schema");
  }

  console.log(`Dropping schema: ${schema}`);
  const client = postgres(connectionString, { max: 1 });

  await client`DROP SCHEMA IF EXISTS ${client(schema)} CASCADE`;

  console.log(`Schema ${schema} dropped`);

  // Reset search_path before returning connection to pool
  await client`SET search_path TO public`;

  await client.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed to drop schema:", err);
  process.exit(1);
});
