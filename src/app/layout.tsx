import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
