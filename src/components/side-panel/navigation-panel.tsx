import { LuFeather } from "react-icons/lu";
import { Separator } from "~/components/ui/separator";
import { Card } from "~/components/ui/card";
import { CV, Settings } from "~/components/side-panel/nav-items";
import { NavLink } from "~/components/side-panel/shared";
import { Resumes } from "~/components/side-panel/resumes";

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
