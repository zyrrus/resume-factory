import { createTable } from "~/server/db/schema/create-table";
import { boolean, primaryKey, varchar } from "drizzle-orm/pg-core";
import {
  cv,
  cvDetail,
  education,
  experience,
  experienceDescription,
  project,
  projectDescription,
} from "~/server/db/schema/cv";

export const resume = createTable("resume", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  cvId: varchar("cv_id", { length: 255 }).references(() => cv.id),
  name: varchar("name", { length: 255 }),
  fileName: varchar("file_name", { length: 255 }),
  role: varchar("role", { length: 255 }),
});

export const resumeState = createTable("resume_state", {
  resumeId: varchar("resume_id", { length: 255 })
    .references(() => resume.id)
    .primaryKey(),
  role: boolean("role"),
  email: boolean("email"),
  phone: boolean("phone"),
});

export const cvDetailState = createTable(
  "cv_detail_state",
  {
    resumeId: varchar("resume_id", { length: 255 }).references(() => resume.id),
    cvDetailId: varchar("cv_detail_id", { length: 255 }).references(
      () => cvDetail.id,
    ),
    active: boolean("active"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.resumeId, table.cvDetailId] }),
  }),
);

export const educationState = createTable(
  "education_state",
  {
    resumeId: varchar("resume_id", { length: 255 }).references(() => resume.id),
    educationId: varchar("education_id", { length: 255 }).references(
      () => education.id,
    ),
    active: boolean("active"),
    gpa: boolean("gpa"),
    dates: boolean("dates"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.resumeId, table.educationId] }),
  }),
);

export const experienceState = createTable(
  "experience_state",
  {
    resumeId: varchar("resume_id", { length: 255 }).references(() => resume.id),
    experienceId: varchar("experience_id", { length: 255 }).references(
      () => experience.id,
    ),
    active: boolean("active"),
    role: boolean("role"),
    employer: boolean("employer"),
    dates: boolean("dates"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.resumeId, table.experienceId] }),
  }),
);

export const experienceDescriptionState = createTable(
  "experience_description_state",
  {
    resumeId: varchar("resume_id", { length: 255 }).references(() => resume.id),
    experienceDescriptionId: varchar("experience_description_id", {
      length: 255,
    }).references(() => experienceDescription.id),
    active: boolean("active"),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.resumeId, table.experienceDescriptionId],
    }),
  }),
);

export const projectState = createTable(
  "project_state",
  {
    resumeId: varchar("resume_id", { length: 255 }).references(() => resume.id),
    projectId: varchar("project_id", { length: 255 }).references(
      () => project.id,
    ),
    active: boolean("active"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.resumeId, table.projectId] }),
  }),
);

export const projectDescriptionState = createTable(
  "project_description_state",
  {
    resumeId: varchar("resume_id", { length: 255 }).references(() => resume.id),
    projectDescriptionId: varchar("project_description_id", {
      length: 255,
    }).references(() => projectDescription.id),
    active: boolean("active"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.resumeId, table.projectDescriptionId] }),
  }),
);
