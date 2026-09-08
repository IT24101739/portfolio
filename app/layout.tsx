import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { seoInfo } from "@/data/personal";

export const metadata: Metadata = {
  title: seoInfo.title,
  description: seoInfo.description,
  keywords: [
    "Maleesha Maddegoda",
    "AI Engineer",
    "ML Engineer",
    "Full Stack Developer",
    "SLIIT",
    "Sri Lanka",
    "Machine Learning",
    "Artificial Intelligence",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Maleesha Maddegoda" }],
  creator: "Maleesha Maddegoda",
  metadataBase: new URL(seoInfo.canonical),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: seoInfo.canonical,
    title: seoInfo.title,
    description: seoInfo.description,
    siteName: "Maleesha Maddegoda Portfolio",
    images: [
      {
        url: seoInfo.ogImage,
        width: 1200,
        height: 630,
        alt: "Maleesha Maddegoda — AI & ML Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoInfo.title,
    description: seoInfo.description,
    images: [seoInfo.ogImage],
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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="maleesha-portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
