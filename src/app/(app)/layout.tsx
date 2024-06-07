import { type PropsWithChildren } from "react";
import { NavigationPanel } from "./navigation-panel";
import { CategoryPanel } from "./category-panel";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid md:grid-cols-[324px_minmax(0,1fr)_324px]">
      <NavigationPanel />
      <div className="max-h-screen overflow-auto">{children}</div>
      <CategoryPanel />
    </div>
  );
}
