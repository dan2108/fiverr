import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/navigation";
import { MobileNav } from "@/components/mobile-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Fiverr Studio - Generate Social Content, Scripts & Branding Kits",
  description: "Professional AI-powered content generation for Fiverr services. Create social media posts, TikTok scripts, and branding kits in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col md:flex-row">
          <MobileNav />
          <aside className="hidden w-64 border-r bg-card md:block">
            <div className="sticky top-0 p-4">
              <h1 className="mb-4 text-xl font-bold">AI Fiverr Studio</h1>
              <Navigation />
            </div>
          </aside>
          <main className="flex-1">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
