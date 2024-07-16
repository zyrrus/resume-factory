import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema/index.ts",
  driver: "pg",
  out: "./drizzle/",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  tablesFilter: ["rf_*"],
} satisfies Config;
