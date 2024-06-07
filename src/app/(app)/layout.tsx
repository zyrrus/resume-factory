import { type PropsWithChildren } from "react";
import { NavigationPanel } from "./navigation-panel";
import { CategoryPanel } from "./category-panel";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <NavigationPanel />
      <main className="mx-80">{children}</main>
      <CategoryPanel />
    </>
  );
}
