import { type PropsWithChildren } from "react";
import { NavigationPanel } from "./_side-panel/navigation-panel";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[324px_minmax(0,1fr)]">
      <NavigationPanel />
      {children}
    </div>
  );
}
