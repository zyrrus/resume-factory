import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema/index.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL,
  },
  tablesFilter: ["resume-factory_*"],
} satisfies Config;
