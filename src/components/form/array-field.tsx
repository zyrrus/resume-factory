"use client";

import {
  useFieldArray,
  useFormContext,
  type ArrayPath,
  type FieldArray,
  type FieldPath,
} from "react-hook-form";
import { LuTrash } from "react-icons/lu";
import { type FormSchema } from "~/app/(app)/cv/schema";
import { Button } from "~/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

export const ArrayField = <
  TFieldValues extends FormSchema,
  TName extends ArrayPath<TFieldValues>,
  TFieldName extends FieldPath<TFieldValues>,
  TDefaultValue extends FieldArray<FormSchema, TName>,
>({
  name,
  fieldNames,
  label,
  buttonLabel,
  defaultValue,
  description,
  placeholder,
}: {
  name: TName;
  fieldNames: (index: number) => TFieldName;
  label: string;
  buttonLabel: string;
  defaultValue: TDefaultValue;
  description?: string;
  placeholder?: string;
}) => {
  const form = useFormContext<FormSchema>();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: name,
  });

  return (
    <div>
      {fields.map((field, index, array) => (
        <FormField
          control={form.control}
          key={field.id}
          name={fieldNames(index)}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn(index !== 0 && "sr-only")}>
                {label}
              </FormLabel>
              {description && (
                <FormDescription className={cn(index !== 0 && "sr-only")}>
                  {description}
                </FormDescription>
              )}
              <div className="flex flex-row gap-x-2">
                <FormControl>
                  {/* @ts-expect-error - TS thinks that non-string fields (like `isOngoing` and `[{ value: '' }]`) are going to be used here  */}
                  <Input placeholder={placeholder} {...field} />
                </FormControl>
                <Button
                  size="icon"
                  variant="outline"
                  type="button"
                  disabled={array.length === 1}
                  onClick={() => remove(index)}
                >
                  <LuTrash className="h-4 w-4" />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        className="mt-4"
        onClick={() => append(defaultValue)}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};
