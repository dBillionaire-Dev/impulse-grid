import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://impulse-grid.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Impulse Grid | AI Automation Consultant",
    template: "%s | Impulse Grid",
  },

  description:
    "Impulse Grid helps businesses automate workflows with AI while creating modern brands, websites, and business systems that scale.",

  keywords: [
    "AI Automation",
    "n8n",
    "Zapier",
    "Workflow Automation",
    "Business Automation",
    "AI Consulting",
    "Brand Identity",
    "Web Design",
    "Graphic Design",
    "Business Systems",
    "Automation Agency",
    "Nigeria",
    "Africa",
  ],

  authors: [
    {
      name: "Impulse Grid",
      url: siteUrl,
    },
  ],

  creator: "Impulse Grid",
  publisher: "Impulse Grid",

  category: "Technology",

  applicationName: "Impulse Grid",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Impulse Grid",
    title: "Impulse Grid | AI Automation & Design Consultant",
    description:
      "Automate workflows that slows you down with AI. Build powerful business systems. Design brands that stand out.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Impulse Grid",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Impulse Grid | AI Automation & Design Consultant",
    description:
      "AI Automation • n8n • Business Systems • Brand Design",

    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      {
        url: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  verification: {
    // google: "GOOGLE_VERIFICATION_CODE",
    // bing: "BING_VERIFICATION_CODE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
  themeColor: "#0a0e27",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}