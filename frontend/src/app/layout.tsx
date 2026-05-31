import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gathordocs.com"),
  title: {
    default: "GathorDocs — Convert Anything. Beautifully.",
    template: "%s · GathorDocs",
  },
  description:
    "Premium AI-native file conversion. PDF, DOCX, image and developer tools. No signup. Files auto-delete after 30 minutes.",
  keywords: [
    "PDF to DOCX",
    "DOCX to PDF",
    "Compress PDF",
    "Merge PDF",
    "Image converter",
    "GathorDocs",
  ],
  openGraph: {
    title: "GathorDocs — Convert Anything. Beautifully.",
    description:
      "Premium AI-native file conversion. No signup. Files auto-delete after 30 minutes.",
    type: "website",
    url: "https://gathordocs.com",
    siteName: "GathorDocs",
  },
  twitter: {
    card: "summary_large_image",
    title: "GathorDocs",
    description: "Convert Anything. Beautifully.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${display.variable}`}>
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
