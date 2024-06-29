import { createTable } from "~/server/db/schema/create-table";
import {
  boolean,
  foreignKey,
  integer,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const cv = createTable("cv", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(), // "Foreign key" from Clerk
  lastUpdated: timestamp("last_updated"),
});

export const resume = createTable("resume", {
  id: serial("id").primaryKey(),
  cvId: integer("cv_id").references(() => cv.id, { onDelete: "cascade" }),
  lastUpdated: timestamp("last_updated"),
});

export const field = createTable(
  "field",
  {
    cvId: integer("cv_id").references(() => cv.id, { onDelete: "cascade" }),
    resumeId: integer("resume_id").references(() => resume.id, {
      onDelete: "cascade",
    }), // Optional
    field: varchar("field", { length: 255 }).unique(),
    value: text("value"),
  },
  (table) => ({ pk: primaryKey({ columns: [table.cvId, table.field] }) }),
);

export const fieldState = createTable(
  "field_state",
  {
    id: serial("id").primaryKey(),
    cvId: integer("cv_id"),
    resumeId: integer("resume_id").references(() => resume.id, {
      onDelete: "cascade",
    }),
    field: varchar("field", { length: 255 }),
    active: boolean("active"),
  },
  (table) => ({
    fieldReference: foreignKey({
      columns: [table.cvId, table.field],
      foreignColumns: [field.cvId, field.field],
      name: "field_fk",
    }),
  }),
);
