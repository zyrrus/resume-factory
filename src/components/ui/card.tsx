import { cn } from "~/lib/utils";

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-lg bg-white p-4 shadow-2xl", className)}
      {...props}
    />
  );
}

export { Card };
