import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitMind AI | Premium Educational Fitness",
  description: "A premium educational platform for trainers and individuals by Donovan Barker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
