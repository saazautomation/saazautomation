import type { Metadata } from "next";
import { Bebas_Neue, Caveat, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import "./redesign.css";
import ElevenLabsWidget from "@/components/ElevenLabsWidget";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-d",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-b",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-m",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "SAAZ AUTOMATION — Intelligent AI Systems",
  description:
    "Trading bots, AI agents, machine learning models, and agentic workflows for founders who want leverage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebas.variable} ${dmSans.variable} ${spaceMono.variable} ${caveat.variable}`}
      >
        {children}
        <ElevenLabsWidget />
      </body>
    </html>
  );
}
