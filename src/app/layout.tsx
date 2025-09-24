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
      <body className="flex">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
