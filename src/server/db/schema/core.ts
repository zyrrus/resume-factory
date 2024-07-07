import { createTable } from "~/server/db/schema/create-table";
import {
  boolean,
  integer,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const cv = createTable("cv", {
  uid: varchar("uid", { length: 255 }).primaryKey(), // "FK" from Clerk
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const resume = createTable("resume", {
  uid: serial("uid").primaryKey(), // Unique among all resumes
  cvUid: varchar("cv_uid", { length: 255 })
    .notNull()
    .references(() => cv.uid, { onDelete: "cascade" }), // FK
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const field = createTable("field", {
  field: varchar("field", { length: 255 }).primaryKey(),
  cvUid: varchar("cv_uid", { length: 255 })
    .notNull()
    .references(() => cv.uid, { onDelete: "cascade" }), // FK
  value: text("value"),
});

export const fieldState = createTable(
  "field_state",
  {
    resumeUid: integer("resume_uid")
      .notNull()
      .references(() => resume.uid, { onDelete: "cascade" }), // FK
    field: varchar("field", { length: 255 })
      .notNull()
      .references(() => field.field, { onDelete: "cascade" }), // FK
    active: boolean("active"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.field, table.resumeUid] }),
  }),
);
