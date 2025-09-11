import "./../styles/globals.css";
import type { ReactNode } from "react";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Nata Television",
  description: "Creative Production, Post and Animation Studio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-neutral-900 text-neutral-200">
      <head>
        {/* Millora temps de connexió amb Vimeo */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />
      </head>
      <body className="antialiased">
        {children}
        <Nav />
      </body>
    </html>
  );
}
