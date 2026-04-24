import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WhatWasIThinking",
  description: "A simple app to track your thoughts and ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="h-full">{children}</body>
    </html>
  );
}
