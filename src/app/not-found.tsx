import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export default function NotFound() {
  return (
    <div className="container flex min-h-screen max-w-sm flex-col items-stretch justify-center gap-y-4 text-center">
      <div className="font-mono font-medium">
        <p className="text-7xl">404</p>
        <h1 className="mt-2 text-4xl">Page Not Found</h1>
      </div>
      <Separator />
      <p>Could not find requested resource</p>
      <Button asChild className="self-center">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
