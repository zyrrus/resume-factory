import { createTable } from "~/server/db/schema/create-table";
import {
  boolean,
  integer,
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

export const field = createTable("field", {
  id: serial("id").primaryKey(),
  cvId: integer("cv_id").references(() => cv.id, { onDelete: "cascade" }),
  resumeId: integer("resume_id").references(() => resume.id, {
    onDelete: "cascade",
  }), // Optional
  field: varchar("field", { length: 255 }).unique(),
  value: text("value"),
});

export const fieldState = createTable("field_state", {
  id: serial("id").primaryKey(),
  resumeId: integer("resume_id").references(() => resume.id, {
    onDelete: "cascade",
  }),
  fieldId: integer("field_id").references(() => field.id, {
    onDelete: "cascade",
  }),
  active: boolean("active"),
});
