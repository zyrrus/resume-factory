import { type PropsWithChildren } from "react";
import { NavigationPanel } from "./navigation-panel";
import { CategoryPanel } from "./category-panel";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative grid grid-cols-[324px_minmax(0,1fr)]">
      <NavigationPanel />
      <main>{children}</main>
    </div>
  );
}
