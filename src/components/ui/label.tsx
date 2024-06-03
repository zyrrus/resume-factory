"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const labelVariants = cva(
  "text-sm font-medium font-mono leading-none peer-disabled:cursor-not-allowed peer-disabled:font-normal peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "",
        disabled: "cursor-not-allowed font-normal opacity-70",
      },
    },
  },
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & { disabled?: boolean }
>(({ className, disabled = false, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      labelVariants({ variant: disabled ? "disabled" : "default" }),
      className,
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
