import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import { Suspense } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raise Them Ready - The Intentional Parent Blueprint Nobody Gave You",
  description: "An intentional parenting system designed to build lifelong independence and capability in your kids. Stop managing your kids all day, every day. Build a home that runs without you.",
  openGraph: {
    title: "Raise Them Ready - The Intentional Parent Blueprint",
    description: "Build a home that runs without you. An intentional parenting system for lifelong independence.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raise Them Ready - The Intentional Parent Blueprint",
    description: "Build a home that runs without you. An intentional parenting system for lifelong independence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable}`}>
      <head>
        {/* Pre-warm DNS & TCP/TLS connection to Whop checkout, Airtable & Google Analytics */}
        <link rel="preconnect" href="https://whop.com" />
        <link rel="dns-prefetch" href="https://whop.com" />
        <link rel="preconnect" href="https://api.airtable.com" />
        <link rel="dns-prefetch" href="https://api.airtable.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
