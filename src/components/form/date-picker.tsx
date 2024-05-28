import { format } from "date-fns";
import { type FieldPath, useFormContext } from "react-hook-form";
import { LuCalendar } from "react-icons/lu";
import { type FormSchema } from "~/app/(app)/cv/schema";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

export const DatePicker = <TName extends FieldPath<FormSchema>>({
  label,
  fieldName,
  disabled = false,
}: {
  label: string;
  fieldName: TName;
  disabled?: boolean;
}) => {
  const form = useFormContext<FormSchema>();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      disabled={disabled}
      render={({ field }) => {
        // Ignore fields that aren't date strings.
        // This is just to appease TS and should never happen
        if (typeof field.value !== "string" && !(field.value instanceof Date)) {
          return <></>;
        }

        return (
          <FormItem className="flex flex-1 flex-col">
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="input"
                    size="input"
                    className={cn(!field.value && "text-muted-foreground")}
                    disabled={disabled}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <LuCalendar className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(field.value)}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
