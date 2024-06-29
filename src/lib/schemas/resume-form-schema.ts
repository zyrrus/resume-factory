import { z } from "zod";

// Primitives
const stringField = z.string().trim().optional();
const arrayField = z
  .array(
    z.object({
      order: z.number(),
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
        order: z.number(),
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
        order: z.number(),
        role: stringField,
        employer: stringField,
        description: arrayField,
        ...dateFields,
      })
      .refine(refineDate),
  ),
  projects: z.array(
    z.object({
      order: z.number(),
      title: stringField,
      description: arrayField,
    }),
  ),
});

/**
 * This is the Resume Factory CV form as a type
 */
export type ResumeFormSchema = z.infer<typeof resumeFormSchema>;

/**
 * This is all the default values for the Resume Factory CV form
 * These are required, and they cannot be `undefined` or `null`
 */
export const defaultValues: ResumeFormSchema = {
  name: "",
  email: "",
  phone: "",
  languages: [
    {
      value: "",
      order: 0,
    },
  ],
  urls: [
    {
      value: "",
      order: 0,
    },
  ],
  education: [
    {
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      isOngoing: false,
      gpa: "",
      order: 0,
    },
  ],
  awards: [
    {
      value: "",
      order: 0,
    },
  ],
  certificates: [
    {
      value: "",
      order: 0,
    },
  ],
  skills: [
    {
      value: "",
      order: 0,
    },
  ],
  experience: [
    {
      role: "",
      employer: "",
      startDate: "",
      endDate: "",
      isOngoing: false,
      description: [
        {
          value: "",
          order: 0,
        },
      ],
      order: 0,
    },
  ],
  projects: [
    {
      title: "",
      description: [
        {
          value: "",
          order: 0,
        },
      ],
      order: 0,
    },
  ],
};
