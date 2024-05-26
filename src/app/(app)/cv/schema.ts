import { z } from "zod";

export const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  languages: z.array(z.object({ value: z.string() })),
  urls: z.array(z.object({ value: z.string() })),
  education: z.array(z.object({})),
  achievements: z.array(z.object({})),
  experience: z.array(z.object({})),
  projects: z.array(z.object({})),
});

export type FormSchema = z.infer<typeof formSchema>;

export const defaultValues: FormSchema = {
  name: "",
  email: "",
  phone: "",
  languages: [{ value: "" }],
  urls: [{ value: "" }],
  education: [],
  achievements: [],
  experience: [],
  projects: [],
};
