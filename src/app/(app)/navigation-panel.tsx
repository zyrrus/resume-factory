"use client";

import { type PropsWithChildren } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type IconType } from "react-icons/lib";
import {
  LuFeather,
  LuFileText,
  LuLogOut,
  LuSettings,
  LuDownload,
  LuFileEdit,
  LuMoreHorizontal,
  LuTrash,
  LuInfo,
  LuPlusCircle,
} from "react-icons/lu";
import { useAuth } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const MOCK_CATEGORIES = [
  { id: "0", name: "Frontend" },
  { id: "1", name: "Backend" },
  { id: "2", name: "Full-stack" },
];

export const NavigationPanel = () => {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 hidden h-screen w-full max-w-xs p-4 md:flex">
      <Card className="flex w-full flex-col gap-y-5 p-4">
        {/* Logo */}
        <NavLink href="/" icon={LuFeather}>
          Resume Factory
        </NavLink>

        <Separator />

        {/* CV */}
        <div className="space-y-2">
          <SubHeading>CV</SubHeading>
          <NavLink href="/cv" icon={LuFileText} isActive={pathname === "/cv"}>
            Curriculum Vitae
          </NavLink>
        </div>

        {/* Resumes */}
        <Resumes />

        <div className="flex-1" />

        {/* Settings */}
        <Settings />
      </Card>
    </div>
  );
};

const SubHeading: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className="flex flex-row items-center gap-x-1 font-mono text-sm font-medium uppercase text-neutral-800">
      {children}
    </p>
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
        "flex flex-row items-center gap-2 rounded-xl p-3 font-mono font-medium transition-colors hover:bg-neutral-100",
        isActive && "bg-neutral-100 hover:bg-neutral-100/50",
      )}
    >
      <Icon className="h-5 w-5 text-neutral-900" />
      {children}
    </Link>
  );
};

const Resumes = () => {
  return (
    <div className="space-y-2">
      <SubHeading>
        Resumes
        <ResumeTooltip />
      </SubHeading>

      {MOCK_CATEGORIES.map(({ id, name }) => (
        <Category key={name} id={id} name={name} />
      ))}

      <Button className="w-full">
        <LuPlusCircle className="mr-2 h-4 w-4" />
        New Category
      </Button>
    </div>
  );
};

const ResumeTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <LuInfo />
        </TooltipTrigger>
        <TooltipContent align="start">
          <p className="max-w-72 normal-case">
            These are your refined resume categories. Assign sections from your
            CV to these categories create tailored resumes.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface CategoryProps {
  id: string;
  name: string;
}

const Category: React.FC<CategoryProps> = ({ id, name }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/resume/${id}`);
  };

  const handleDownload = () => {
    // TODO: Implement
  };

  const handleDelete = () => {
    // TODO: Implement
  };

  return (
    <div className="flex flex-row gap-x-2">
      <Button
        variant="neutral"
        className="flex-1 justify-start gap-x-2 bg-neutral-50 px-3"
        onClick={handleEdit}
      >
        <LuFileEdit className="h-4 w-4" />
        {name}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="neutral" size="icon" className="bg-neutral-50">
            <LuMoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          {/* <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
            <LuFileEdit className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownload} className="cursor-pointer">
            <LuDownload className="h-4 w-4" />
            Download
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="cursor-pointer text-destructive-500 focus:bg-destructive-50 focus:text-destructive-700"
          >
            <LuTrash className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const Settings = () => {
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
