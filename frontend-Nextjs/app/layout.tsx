import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ClientLayout from "./client-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Pathak Homoeopathic | Natural Healing & Personalized Care",
  description:
    "Experience natural healing with personalized homoeopathic treatment. Dr. Pathak offers safe, side-effect-free care for chronic diseases, skin disorders, allergies, and more. Book your appointment today.",
  keywords: [
    "homoeopathy",
    "natural healing",
    "homoeopathic doctor",
    "alternative medicine",
    "chronic disease treatment",
    "skin disorders",
    "allergies treatment",
  ],
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
