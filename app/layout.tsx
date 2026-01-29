import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import StoreProvider from "@/lib/store/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinearFlow",
  description: "LinearFlow is a platform for tracking your job applications and interviews.",
  openGraph: {
    title: "LinearFlow",
    description: "LinearFlow is a platform for tracking your job applications and interviews.",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "LinearFlow - Job Application Tracker",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinearFlow",
    description: "LinearFlow is a platform for tracking your job applications and interviews.",
    images: ["/image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="bg-noise-overlay" />
        <StoreProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
