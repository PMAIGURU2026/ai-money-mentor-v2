import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Money Mentor — Charlotte",
  description:
    "Free financial education for people earning $0–$62K/year. Meet Charlotte, your AI Money Mentor.",
  keywords: "financial literacy, budgeting, emergency fund, credit score, saving money",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
