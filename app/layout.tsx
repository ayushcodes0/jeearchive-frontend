import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "JEE Mock Test Platform - jeearchive",
  description: "jeearchive provides the most realistic and comprehensive practice environment for JEE students, allowing them to test their knowledge and master every topic before the actual exam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
