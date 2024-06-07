import { type PropsWithChildren } from "react";
import { NavigationPanel } from "./navigation-panel";
import { CategoryPanel } from "./category-panel";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative mx-auto grid max-w-[1920px] grid-cols-[324px_minmax(0,1fr)_324px] min-[1921px]:max-w-7xl">
      <NavigationPanel />
      <main>{children}</main>
      <CategoryPanel />
    </div>
  );
}
