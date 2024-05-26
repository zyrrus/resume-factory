"use client";

import {
  type FormSchema,
  formSchema,
  defaultValues,
} from "~/app/(app)/cv/schema";
import {
  Form,
  FormControl,
  FormDescription,
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
import { cn } from "~/lib/utils";

// TODO: Add delete buttons to list fields
// TODO: Add grab handles to list fields

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
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container flex max-w-2xl flex-col gap-5 py-16"
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
          <Languages />
          <URLs />
          <Separator orientation="horizontal" />

          {/* Education */}
          <SectionHeader
            title="Education"
            subtitle="This is your educational history."
          />
          <Separator orientation="horizontal" />

          {/* Achievements */}
          <SectionHeader
            title="Achievements"
            subtitle="This is your accomplishments and skills."
          />
          <Separator orientation="horizontal" />

          {/* Experience */}
          <SectionHeader
            title="Experience"
            subtitle="This is for your work experience."
          />
          <Separator orientation="horizontal" />

          {/* Projects */}
          <SectionHeader
            title="Projects"
            subtitle="This is for your personal projects."
          />
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

const Languages = () => {
  const form = useFormContext<FormSchema>();

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  return (
    <div>
      {fields.map((field, index) => (
        <FormField
          control={form.control}
          key={field.id}
          name={`languages.${index}.value`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn(index !== 0 && "sr-only")}>
                Languages
              </FormLabel>
              <FormDescription className={cn(index !== 0 && "sr-only")}>
                Add all the languages you speak.
              </FormDescription>
              <FormControl>
                <Input placeholder="Your language" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        className="mt-4"
        onClick={() => append({ value: "" })}
      >
        Add Language
      </Button>
    </div>
  );
};

const URLs = () => {
  const form = useFormContext<FormSchema>();

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "urls",
  });

  return (
    <div>
      {fields.map((field, index) => (
        <FormField
          control={form.control}
          key={field.id}
          name={`urls.${index}.value`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn(index !== 0 && "sr-only")}>
                URLs
              </FormLabel>
              <FormDescription className={cn(index !== 0 && "sr-only")}>
                Add links to your portfolio, GitHub, LinkedIn, or social media
                profiles.
              </FormDescription>
              <FormControl>
                <Input placeholder="https://" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        className="mt-4"
        onClick={() => append({ value: "" })}
      >
        Add URL
      </Button>
    </div>
  );
};
