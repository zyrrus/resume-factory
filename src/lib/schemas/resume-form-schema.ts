import { z } from "zod";

const dates = {
  startDate: z.string().trim().optional(),
  endDate: z.string().trim().optional(),
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
const fieldArray = z.array(z.object({ value: z.string().trim() }));
export const resumeFormSchema = z.object({
  name: z.string().trim().optional(),
  email: z.string().trim().email().optional(),
  phone: z.string().trim().optional(),
  languages: fieldArray,
  urls: fieldArray,
  education: z.array(
    z
      .object({
        school: z.string().trim().optional(),
        degree: z.string().trim().optional(),
        gpa: z.string().trim().optional(),
        ...dates,
      })
      .refine(refineDate),
  ),
  awards: fieldArray,
  certificates: fieldArray,
  skills: fieldArray,
  experience: z.array(
    z
      .object({
        role: z.string().trim().optional(),
        employer: z.string().trim().optional(),
        description: fieldArray,
        ...dates,
      })
      .refine(refineDate),
  ),
  projects: z.array(
    z.object({
      title: z.string().trim().optional(),
      description: fieldArray,
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
  projects: [{ title: "", description: [{ value: "" }] }],
};
