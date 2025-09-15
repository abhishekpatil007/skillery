import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/tokens.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/ui/SEO";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Skillery - Learn Skills That Move You Forward",
    template: "%s | Skillery",
  },
  description: "Master in-demand skills from industry experts. Learn at your pace, track your growth, and stay ahead with our comprehensive online courses.",
  keywords: ["online courses", "learning", "skills", "education", "professional development"],
  authors: [{ name: "Skillery Team" }],
  creator: "Skillery",
  publisher: "Skillery",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://skillery.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skillery.com",
    siteName: "Skillery",
    title: "Skillery - Learn Skills That Move You Forward",
    description: "Master in-demand skills from industry experts. Learn at your pace, track your growth, and stay ahead with our comprehensive online courses.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Skillery - Learn Skills That Move You Forward",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skillery - Learn Skills That Move You Forward",
    description: "Master in-demand skills from industry experts. Learn at your pace, track your growth, and stay ahead with our comprehensive online courses.",
    images: ["/og-image.jpg"],
    creator: "@skillery",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <SEO />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
