import "~/styles/globals.css";

import { Spline_Sans_Mono, Montserrat } from "next/font/google";
import { type PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Resume Factory",
  description:
    "Easily create and manage your tailored resumes based on your history of education, experience, and qualifications.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ rel: "icon", url: "/favicon.ico" }],
    other: [{ rel: "apple-touch-icon", url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`font-sans ${montserrat.variable} ${splineSansMono.variable} text-neutral-950 selection:bg-primary-500 selection:text-neutral-50`}
        >
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
