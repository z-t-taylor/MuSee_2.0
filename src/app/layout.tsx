import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "MuSee",
  description: "An online personal exhibition curation space",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-google-analytics-opt-out="">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="md:flex flex-1 pb-20 md:pb-0">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
