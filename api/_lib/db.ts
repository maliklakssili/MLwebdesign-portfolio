import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

if (!connectionString) {
  console.error("Missing DATABASE_URL / POSTGRES_URL env var — connect a Postgres database in Vercel > Storage.");
}

// Falls back to a syntactically valid placeholder so neon() never throws
// synchronously; queries will fail with a clear error instead of crashing
// the function at import time.
export const sql = neon(connectionString ?? "postgres://placeholder:placeholder@placeholder/placeholder");
