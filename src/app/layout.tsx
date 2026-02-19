import type { Metadata } from "next";
import { inter, plusJakarta } from "@/lib/fonts";
import { CookieConsent } from "@/components/shared/cookie-consent";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "24/7 FBA Prep & Fulfillment | Amazon FBA Prep Center Germany",
    template: "%s | 24/7 FBA Prep & Fulfillment",
  },
  description:
    "Professional Amazon FBA Prep Center in Nürtingen, Germany. Fast, reliable prep services with 24-48 hour turnaround. Plus cargo shipping Germany to Ghana.",
  keywords: [
    "FBA Prep",
    "Amazon FBA",
    "Prep Center Germany",
    "FBA Fulfillment",
    "Amazon Prep Service",
    "Nürtingen",
    "Cargo Shipping Ghana",
  ],
  authors: [{ name: "24/7 FBA Prep & Fulfillment" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "24/7 FBA Prep & Fulfillment",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen bg-white">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
