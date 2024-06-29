import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool, neonConfig } from "@neondatabase/serverless";

import { env } from "~/env";
import * as schema from "./schema";

if (env.NODE_ENV !== "production") {
  // Set the WebSocket proxy to work with the local instance
  neonConfig.wsProxy = (host) => `${host}:5433/v1`;

  // Disable all authentication and encryption
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

const pool = new Pool({
  connectionString: env.POSTGRES_URL,
});

export const db = drizzle(pool, {
  schema,
  logger: true,
});
