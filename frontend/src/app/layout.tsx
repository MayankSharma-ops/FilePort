import type { Metadata } from "next";
import { Archivo, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const sans = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gathordocs.com"),
  title: {
    default: "GathorDocs — Files change shape. Nothing else does.",
    template: "%s · GathorDocs",
  },
  description:
    "Precise PDF, document, image and developer tools. No signup. Files auto-delete after 30 minutes.",
  keywords: ["PDF to DOCX", "DOCX to PDF", "Compress PDF", "Merge PDF", "Image converter", "GathorDocs"],
  openGraph: {
    title: "GathorDocs — Precise file conversion",
    description: "Fast, private file tools with no signup. Files auto-delete after 30 minutes.",
    type: "website",
    url: "https://gathordocs.com",
    siteName: "GathorDocs",
  },
  twitter: {
    card: "summary_large_image",
    title: "GathorDocs",
    description: "Files change shape. Nothing else does.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}