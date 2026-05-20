import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bitzsznn | Vibes. Networking. Opportunity.",
  description:
    "Bitzsznn is a youth cultural community for NYSC and post-NYSC life, events, music, memories, connection, and opportunity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
