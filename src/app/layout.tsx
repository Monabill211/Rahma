import type { Metadata } from "next";
import { Kaushan_Script, Outfit, Poppins } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const kaushan = Kaushan_Script({ subsets: ["latin"], weight: "400", variable: "--font-kaushan", display: "swap" });

export const metadata: Metadata = {
  title: `${site.handle} | ${site.tag}`,
  description: site.blurb,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${outfit.variable} ${kaushan.variable}`}>
      <body className="flex min-h-screen flex-col bg-cream font-body text-purple antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
