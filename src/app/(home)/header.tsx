"use client";

import Link from "next/link";
import { LuFeather, LuGithub, LuMoon } from "react-icons/lu";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { CTA_LINK } from "~/lib/constants";

const HEADER_LINKS = [
  { label: "About", url: "#about" },
  { label: "FAQ", url: "#faq" },
  { label: "Blog", url: "/blog" },
  // { label: "API", url: "/docs" },
];

export const Header: React.FC = () => {
  return (
    <header className="sticky left-0 right-0 top-0 z-40 bg-white font-mono font-medium shadow-xl transition-all duration-300 ease-in-out">
      <div className="mx-auto flex max-w-7xl flex-row justify-between gap-x-4 p-4">
        <div className="flex flex-row items-center">
          <LuFeather className="h-6 w-6 text-neutral-900" />
          <Button asChild variant="link" className="px-3 text-base">
            <Link href="/">Resume Factory</Link>
          </Button>
        </div>

        <nav className="flex flex-row items-center gap-x-8">
          {/* Main Links */}
          <div className="flex flex-row gap-x-2">
            {HEADER_LINKS.map(({ label, url }) => (
              <Button key={label} asChild variant="link">
                <Link href={url}>{label}</Link>
              </Button>
            ))}
          </div>

          {/* Icon Buttons */}
          <div className="flex flex-row gap-x-2">
            <Button size="icon" variant="ghost" asChild>
              <a
                href="https://github.com/zyrrus/resume-factory"
                target="_blank"
              >
                <LuGithub className="h-4 w-4 text-neutral-900" />
              </a>
            </Button>
            {/* TODO: https://ui.shadcn.com/docs/dark-mode/next */}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                toast.warning("Dark mode coming soon");
              }}
            >
              <LuMoon className="h-4 w-4 text-neutral-900" />
            </Button>
          </div>

          {/* CTA */}
          <Button asChild>
            <Link href={CTA_LINK}>Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};
