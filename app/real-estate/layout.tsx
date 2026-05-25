import { Inter } from "next/font/google";
import "../voice-agents/voice-agents.css";
import "./real-estate.css";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-re",
  display: "swap",
});

export default function RealEstateLayout({ children }: { children: ReactNode }) {
  return <div className={`re-font-root ${inter.variable}`}>{children}</div>;
}
