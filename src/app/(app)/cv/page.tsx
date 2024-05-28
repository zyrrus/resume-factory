"use client";

import {
  type FormSchema,
  formSchema,
  defaultValues,
} from "~/app/(app)/cv/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Separator } from "~/components/ui/separator";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { ArrayField } from "~/components/form/array-field";
import { DatePicker } from "~/components/form/date-picker";

// TODO: Add grab handles to list fields
// TODO: Bug - Disabled input doesn't disable label

export default function Page() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: FormSchema) {
    console.log(values);
    toast("You submitted the form.");
  }

  return (
    <main className="container relative max-w-2xl py-16">
      <div className="fixed bottom-8 right-8 top-8 z-30">
        <Card className="max-h-full w-96 overflow-auto">
          <h2 className="mb-2 font-mono font-medium">Form Values:</h2>
          <pre className="font-mono text-xs">
            {JSON.stringify(form.watch(), undefined, 2)}
          </pre>
        </Card>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Header */}
          <div className="flex flex-col gap-y-2">
            <h1 className="font-mono text-2xl font-semibold">
              Curriculum Vitae
            </h1>
            <p className="text-neutral-800">
              This is your extended resume. Add all education, skills,
              experiences, and projects.
            </p>
          </div>
          <Separator orientation="horizontal" />

          {/* Personal Details */}
          <SectionHeader
            title="Personal Details"
            subtitle="This is all the basic information about yourself."
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ArrayField
            name="languages"
            fieldNames={(index) => `languages.${index}.value`}
            label="Languages"
            description="Add all the languages you speak."
            buttonLabel="Add Language"
            placeholder="Your language"
            defaultValue={defaultValues.languages[0]!}
          />
          <ArrayField
            name="urls"
            fieldNames={(index) => `urls.${index}.value`}
            label="URLs"
            description="Add links to your portfolio, GitHub, LinkedIn, or social media profiles."
            buttonLabel="Add URL"
            placeholder="https://"
            defaultValue={defaultValues.urls[0]!}
          />
          <Separator orientation="horizontal" />

          {/* Education */}
          <SectionHeader
            title="Education"
            subtitle="This is your educational history."
          />
          <Education />
          <Separator orientation="horizontal" />

          {/* Achievements */}
          <SectionHeader
            title="Achievements"
            subtitle="This is your accomplishments and skills."
          />
          <ArrayField
            name="awards"
            fieldNames={(index) => `awards.${index}.value`}
            label="Awards"
            description="Add your awards."
            buttonLabel="Add Award"
            placeholder="Your award"
            defaultValue={defaultValues.awards[0]!}
          />
          <ArrayField
            name="certificates"
            fieldNames={(index) => `certificates.${index}.value`}
            label="Certificates"
            description="Add your certificates."
            buttonLabel="Add Certificate"
            placeholder="Your certificate"
            defaultValue={defaultValues.certificates[0]!}
          />
          <ArrayField
            name="skills"
            fieldNames={(index) => `skills.${index}.value`}
            label="Skills"
            description="Add your skills."
            buttonLabel="Add Skill"
            placeholder="Your skill"
            defaultValue={defaultValues.skills[0]!}
          />
          <Separator orientation="horizontal" />

          {/* Experience */}
          <SectionHeader
            title="Experience"
            subtitle="This is for your work experience."
          />
          <Experience />
          <Separator orientation="horizontal" />

          {/* Projects */}
          <SectionHeader
            title="Projects"
            subtitle="This is for your personal projects."
          />
          <Projects />
        </form>
      </Form>
    </main>
  );
}

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="font-mono text-lg font-medium">{title}</h1>
      {subtitle && <p className="text-neutral-800">{subtitle}</p>}
    </div>
  );
};

const Education = () => {
  const form = useFormContext<FormSchema>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  return (
    <div>
      <div className="flex flex-col gap-y-5">
        {fields.map((field, index, array) => (
          <Card key={field.id} className="flex flex-col gap-y-5">
            <FormField
              control={form.control}
              name={`education.${index}.school`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School</FormLabel>
                  <FormControl>
                    <Input placeholder="Your school" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`education.${index}.degree`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree(s)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your degree" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row items-end gap-x-5">
              <DatePicker
                label="Start Date"
                fieldName={`education.${index}.startDate`}
              />
              <DatePicker
                label="End Date"
                fieldName={`education.${index}.endDate`}
                disabled={form.watch(`education.${index}.isOngoing`)}
              />
              <FormField
                control={form.control}
                name={`education.${index}.isOngoing`}
                render={({ field }) => (
                  <FormItem className="mr-2.5 flex h-9 flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Ongoing</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name={`education.${index}.gpa`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GPA</FormLabel>
                  <FormControl>
                    <Input placeholder="Your GPA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="destructive"
              className="self-end"
              onClick={() => remove(index)}
              disabled={index === 0 && array.length === 1}
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="mt-4"
        onClick={() => append(defaultValues.education[0]!)}
      >
        Add Education
      </Button>
    </div>
  );
};

const Experience = () => {
  const form = useFormContext<FormSchema>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  return (
    <div>
      <div className="flex flex-col gap-y-5">
        {fields.map((field, index, array) => (
          <Card key={field.id} className="flex flex-col gap-y-5">
            <FormField
              control={form.control}
              name={`experience.${index}.employer`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employer</FormLabel>
                  <FormControl>
                    <Input placeholder="Your employer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row items-end gap-x-5">
              <DatePicker
                label="Start Date"
                fieldName={`experience.${index}.startDate`}
              />
              <DatePicker
                label="End Date"
                fieldName={`experience.${index}.endDate`}
                disabled={form.watch(`experience.${index}.isOngoing`)}
              />
              <FormField
                control={form.control}
                name={`experience.${index}.isOngoing`}
                render={({ field }) => (
                  <FormItem className="mr-2.5 flex h-9 flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Ongoing</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <ArrayField
              name={`experience.${index}.description`}
              fieldNames={(i) => `experience.${index}.description.${i}.value`}
              label="Description"
              description="Describe your project and achievements in bullet points."
              buttonLabel="Add Description"
              placeholder="Your description"
              defaultValue={defaultValues.experience[0]!.description[0]!}
            />
            <Button
              type="button"
              variant="destructive"
              className="self-end"
              onClick={() => remove(index)}
              disabled={index === 0 && array.length === 1}
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="mt-4"
        onClick={() => append(defaultValues.experience[0]!)}
      >
        Add Experience
      </Button>
    </div>
  );
};

const Projects = () => {
  const form = useFormContext<FormSchema>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  return (
    <div>
      <div className="flex flex-col gap-y-5">
        {fields.map((field, index, array) => (
          <Card key={field.id} className="flex flex-col gap-y-5">
            <FormField
              control={form.control}
              name={`projects.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ArrayField
              name={`projects.${index}.description`}
              fieldNames={(i) => `projects.${index}.description.${i}.value`}
              label="Description"
              description="Describe your project experience and achievements in bullet points."
              buttonLabel="Add Description"
              placeholder="Your description"
              defaultValue={defaultValues.projects[0]!.description[0]!}
            />
            <Button
              type="button"
              variant="destructive"
              className="self-end"
              onClick={() => remove(index)}
              disabled={index === 0 && array.length === 1}
            >
              Delete
            </Button>
          </Card>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="mt-4"
        onClick={() => append(defaultValues.projects[0]!)}
      >
        Add Project
      </Button>
    </div>
  );
};
