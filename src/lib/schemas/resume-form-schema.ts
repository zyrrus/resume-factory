import { z } from "zod";

// Primitives
const stringField = z.string().trim().optional();
const arrayField = z
  .array(
    z.object({
      value: z.string().trim(),
    }),
  )
  .transform((arr) => arr.filter(({ value }) => value.length > 0));
const dateFields = {
  startDate: stringField,
  endDate: stringField,
  isOngoing: z.boolean(),
};

const refineDate = (input: { endDate?: string; isOngoing: boolean }) => {
  // If endDate is empty and 'Ongoing' is not checked, then object is invalid
  if (input.endDate === undefined && !input.isOngoing) return false;
  return true;
};

/**
 * This is the shape of the Resume Factory CV form
 */
export const resumeFormSchema = z.object({
  name: stringField,
  email: stringField,
  phone: stringField,
  languages: arrayField,
  urls: arrayField,
  education: z.array(
    z
      .object({
        school: stringField,
        degree: stringField,
        gpa: stringField,
        ...dateFields,
      })
      .refine(refineDate),
  ),
  awards: arrayField,
  certificates: arrayField,
  skills: arrayField,
  experience: z.array(
    z
      .object({
        role: stringField,
        employer: stringField,
        description: arrayField,
        ...dateFields,
      })
      .refine(refineDate),
  ),
  projects: z.array(
    z.object({
      title: stringField,
      description: arrayField,
    }),
  ),
});

/**
 * This is the Resume Factory CV form as a type
 */
export type ResumeFormSchema = z.infer<typeof resumeFormSchema>;
export type DatedCVSchema = ResumeFormSchema & { lastUpdated?: string };

/**
 * This is all the default values for the Resume Factory CV form
 * These are required, and they cannot be `undefined` or `null`
 */
export const defaultValues: ResumeFormSchema = {
  name: "",
  email: "",
  phone: "",
  languages: [{ value: "" }],
  urls: [{ value: "" }],
  education: [
    {
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      isOngoing: false,
      gpa: "",
    },
  ],
  awards: [{ value: "" }],
  certificates: [{ value: "" }],
  skills: [{ value: "" }],
  experience: [
    {
      role: "",
      employer: "",
      startDate: "",
      endDate: "",
      isOngoing: false,
      description: [{ value: "" }],
    },
  ],
  projects: [
    {
      title: "",
      description: [{ value: "" }],
    },
  ],
};
