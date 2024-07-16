import { type PropsWithChildren } from "react";
import Link from "next/link";
import { type IconType } from "react-icons/lib";
import { cn } from "~/lib/utils";

interface NavLinkProps {
  href: string;
  icon: IconType;
  isActive?: boolean;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({
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

export const SubHeading: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className="flex flex-row items-center gap-x-1 font-mono text-sm font-medium uppercase text-neutral-800">
      {children}
    </p>
  );
};
