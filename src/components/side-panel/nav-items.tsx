"use client";

import { useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LuFileText, LuLogOut, LuSettings } from "react-icons/lu";
import { NavLink, SubHeading } from "~/components/side-panel/shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const CV = () => {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      <SubHeading>CV</SubHeading>
      <NavLink href="/cv" icon={LuFileText} isActive={pathname === "/cv"}>
        Curriculum Vitae
      </NavLink>
    </div>
  );
};

export const Settings = () => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row items-center gap-2 rounded-xl p-3 font-mono font-medium transition-colors hover:bg-neutral-100">
        <LuSettings className="h-5 w-5 text-neutral-900" />
        Settings
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start">
        <DropdownMenuItem
          onClick={() => signOut({ redirectUrl: "/" })}
          className="cursor-pointer"
        >
          <LuLogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
