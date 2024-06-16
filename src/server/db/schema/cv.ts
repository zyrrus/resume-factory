import { createTable } from "~/server/db/schema/create-table";
import { date, text, varchar } from "drizzle-orm/pg-core";

export const cv = createTable("cv", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(), // "Foreign key" from Clerk
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
});

export const cvDetail = createTable("cv_detail", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  cvId: varchar("cv_id", { length: 255 }).references(() => cv.id),
  detailType: varchar("detail_type", {
    length: 32,
    enum: ["languages", "urls", "awards", "certificates", "skills"],
  }),
  value: text("value"),
});

export const education = createTable("education", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  cvId: varchar("cv_id", { length: 255 }).references(() => cv.id),
  school: varchar("school", { length: 128 }),
  degree: varchar("degree", { length: 128 }),
  gpa: varchar("gpa", { length: 32 }),
  start_date: date("start_date"),
  end_date: date("end_date"),
});

export const experience = createTable("experience", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  cvId: varchar("cv_id", { length: 255 }).references(() => cv.id),
  role: varchar("role", { length: 128 }),
  employer: varchar("employer", { length: 128 }),
  start_date: date("start_date"),
  end_date: date("end_date"),
});

export const experience_description = createTable("experience_description", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  experienceId: varchar("experience_id", { length: 255 }).references(
    () => experience.id,
  ),
  value: text("value"),
});

export const project = createTable("project", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  cvId: varchar("cv_id", { length: 255 }).references(() => cv.id),
  title: varchar("title", { length: 128 }),
});

export const project_description = createTable("project_description", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  projectId: varchar("project_id", { length: 255 }).references(
    () => project.id,
  ),
  value: text("value"),
});
