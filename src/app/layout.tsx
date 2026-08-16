import type { Metadata } from "next";
import { Forum, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const forum = Forum({
  subsets: ["latin"],
  variable: "--font-forum",
  display: "swap",
  weight: "400",
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
      <body className={`${manrope.variable} ${forum.variable} antialiased`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
