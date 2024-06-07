"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type IconType } from "react-icons/lib";
import {
  LuBookmark,
  LuFeather,
  LuFileText,
  LuHelpCircle,
  LuSettings,
} from "react-icons/lu";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

export const NavigationPanel = () => {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 hidden h-full max-h-screen w-full max-w-xs p-4 md:flex">
      <Card className="flex w-full flex-col gap-y-5 p-4">
        <NavLink href="/" icon={LuFeather}>
          Resume Factory
        </NavLink>

        <Separator />

        <div className="space-y-2">
          <NavLink href="/cv" icon={LuFileText} isActive={pathname === "/cv"}>
            Curriculum Vitae
          </NavLink>
        </div>

        <div className="flex-1" />

        <div className="space-y-2">
          <NavLink
            href="/blog"
            icon={LuBookmark}
            isActive={pathname === "/blog"}
          >
            Blog
          </NavLink>

          <NavLink
            href="/help"
            icon={LuHelpCircle}
            isActive={pathname === "/help"}
          >
            Help
          </NavLink>
        </div>

        <Separator />

        <NavLink href="/settings" icon={LuSettings} isActive={false}>
          Settings
        </NavLink>
      </Card>
    </div>
  );
};

interface NavLinkProps {
  href: string;
  icon: IconType;
  isActive?: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  icon: Icon,
  isActive = false,
  children,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row items-center gap-2 rounded-xl p-3 font-mono font-medium hover:bg-neutral-100",
        isActive && "bg-neutral-100 hover:bg-neutral-100/50",
      )}
    >
      <Icon className="h-5 w-5 text-neutral-900" />
      {children}
    </Link>
  );
};
