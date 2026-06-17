import "./globals.css";

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SecureHub",
  description:
    "Multi-tenant SaaS application for project management and collaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn("h-full antialiased", dmSans.className)}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
