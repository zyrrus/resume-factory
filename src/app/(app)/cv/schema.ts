import { z } from "zod";

const dates = {
  startDate: z.string(),
  endDate: z.string(),
  isOngoing: z.boolean(),
};

const refineDate = (input: { endDate: string; isOngoing: boolean }) => {
  // If endDate is empty and 'Ongoing' is not checked, then object is invalid
  if (input.endDate === undefined && !input.isOngoing) return false;
  return true;
};

export const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  languages: z.array(z.object({ value: z.string() })),
  urls: z.array(z.object({ value: z.string() })),
  education: z.array(
    z
      .object({
        school: z.string(),
        degree: z.string(),
        gpa: z.string(),
        ...dates,
      })
      .refine(refineDate),
  ),
  awards: z.array(z.object({ value: z.string() })),
  certificates: z.array(z.object({ value: z.string() })),
  skills: z.array(z.object({ value: z.string() })),
  experience: z.array(
    z
      .object({
        employer: z.string(),
        description: z.array(z.object({ value: z.string() })),
        ...dates,
      })
      .refine(refineDate),
  ),
  projects: z.array(
    z.object({
      title: z.string(),
      description: z.array(z.object({ value: z.string() })),
    }),
  ),
});

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaArrayKey = Exclude<
  keyof z.infer<typeof formSchema>,
  "name" | "email" | "phone" | "education" | "experience" | "projects" // These fields aren't simple value arrays (i.e. z.array(z.object({ value: z.string() }))).
>;

export const defaultValues: FormSchema = {
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
      employer: "",
      startDate: "",
      endDate: "",
      isOngoing: false,
      description: [{ value: "" }],
    },
  ],
  projects: [{ title: "", description: [{ value: "" }] }],
};
