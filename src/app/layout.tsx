import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Aura Wealth — AI Voice-Powered Personal Finance Coach",
  description:
    "Track net worth, manage transactions, and reach savings goals with Aura Wealth, your AI voice-powered wealth coach.",
  metadataBase: new URL("https://aurawealth.app"),
  openGraph: {
    title: "Aura Wealth — AI Voice-Powered Personal Finance Coach",
    description:
      "Track net worth, manage transactions, and reach savings goals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

