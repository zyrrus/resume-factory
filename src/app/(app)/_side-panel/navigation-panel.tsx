import { LuFeather } from "react-icons/lu";
import { Separator } from "~/components/ui/separator";
import { CV, Settings } from "~/app/(app)/_side-panel/nav-items";
import { Card } from "~/components/ui/card";
import { NavLink } from "~/app/(app)/_side-panel/shared";
import { Resumes } from "~/app/(app)/_side-panel/resumes";

export const NavigationPanel = () => {
  return (
    <div className="sticky top-0 hidden h-screen w-full max-w-xs p-4 md:flex">
      <Card className="flex w-full flex-col gap-y-5 p-4">
        <NavLink href="/" icon={LuFeather}>
          Resume Factory
        </NavLink>

        <Separator />

        <CV />
        <Resumes />

        <div className="flex-1" />

        <Settings />
      </Card>
    </div>
  );
};
